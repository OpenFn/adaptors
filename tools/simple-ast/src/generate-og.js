#!/usr/bin/env node
/* eslint no-var: 0 */
const argv = require('yargs').argv;
var babylon = require('@babel/parser');
var fs = require('fs');
var path = require('path');
var doctrine = require('doctrine');
var isEqual = require('lodash.isequal');

let errors = [];

var filename = argv.adaptor;

if (!filename) {
  console.error('No filename was specified.');
  process.exit(0);
}

var outputPath = argv.output;
if (!outputPath) {
  console.error('No output directory specified');
  process.exit(0);
}

var file = fs.readFileSync(filename, 'utf8');
console.log(`Parsing ${filename}`);
var ast = babylon.parse(file, {
  sourceType: 'module',
}).program.body;

// TODO: how can we pluck out things like 'axios' and give users a link to the axios module docs?
// fs.writeFileSync(
//   './tmp/raw.json',
//   JSON.stringify(
//     ast.map(i => {
//       i.type == 'ExpressionStatement' &&
//         console.log(JSON.stringify(i.expression.callee.object.object.object.name, null, 2));
//       return i.type;
//     }),
//     null,
//     2
//   )
// );

// Pull out relevant functions and variables...
function selectExports(ast) {
  exportedVariables = ast
    .filter(i => i.declaration)
    .filter(i => i.declaration.type == 'VariableDeclaration');

  exportedFunctions = ast
    .filter(i => i.declaration)
    .filter(i => i.declaration.type == 'FunctionDeclaration');

  externalFunctions = ast
    .filter(i => i.type == 'ExportNamedDeclaration')
    .filter(i => i.specifiers.length > 0)
    // .filter(i => i.source.value == '@openfn/language-common')
    .map(i =>
      i.specifiers.map(s => {
        return s.exported.name;
      })
    )
    .flat();

  return { exportedFunctions, exportedVariables, externalFunctions };
}

function parseDocs(item) {
  docs = item.leadingComments
    ? item.leadingComments
        .filter(function (item) {
          return item.type == 'CommentBlock';
        })
        .map(function (item) {
          return doctrine.parse(item.value, { unwrap: true, sloppy: true });
        })
    : [];

  if (docs.length > 1) {
    console.log(
      '\x1b[31m%s\x1b[0m',
      `Warning: Multiple leading comment blocks found. Discarding all but first:`
    );
    item.leadingComments.map(function (item) {
      console.log(item.value);
    });
  }

  return docs[0];
}

// Check if the documented params match the real params
function checkDocs(name, docs, params, last) {
  var statedParams = docs
    ? docs.tags
        .filter(function (item) {
          return item.title == 'param';
        })
        .map(function (item) {
          return item.name;
        })
    : 'No docs.';

  if (isEqual(statedParams, params)) {
    process.stdout.write(`${last ? '└─ ' : '├─ '}`);
    console.log('\x1b[32m%s\x1b[0m', `${name} is properly documented ✓`);
    return true;
  } else {
    process.stdout.write(`${last ? '└─ ' : '├─ '}`);
    console.log(
      '\x1b[33m%s\x1b[0m',
      `Warning: Invalid documentation for ${name} ✗`,
      `Stated params are '${statedParams}', but detected params are '${JSON.stringify(
        params
      )}'.`
    );
    return false;
  }
}

// Format them for use on OpenFn...
function format(exp) {
  const countFuncs = exp.exportedFunctions.length;
  const formattedFunctions = exp.exportedFunctions.map(function (item, index) {
    countFuncs === index + 1 ? (last = true) : (last = false);
    const name = item.declaration.id.name;
    const params = item.declaration.params.map(i => {
      switch (i.type) {
        case 'RestElement':
          return i.argument.name;

        case 'AssignmentPattern':
          return i.left.name;

        default:
          return i.name;
      }
    });
    const docs = parseDocs(item);
    const valid = checkDocs(name, docs, params, last);

    return {
      name,
      params,
      docs,
      valid,
    };
  });

  const countVars = exp.exportedVariables.length;

  const formattedVariables = exp.exportedVariables.map(function (item, index) {
    countVars === index + 1 ? (last = true) : (last = false);

    const name = item.declaration.declarations[0].id.name;

    let params = {};
    if (item.declaration.declarations[0].init.arguments) {
      params = item.declaration.declarations[0].init.arguments[0].params.map(
        item => {
          return item.name;
        }
      );
    }

    const docs = parseDocs(item);
    const valid = checkDocs(name, docs, params, last);

    return {
      name,
      params,
      docs,
      valid,
    };
  });

  return { formattedFunctions, formattedVariables };
}

var adaptorAst = selectExports(ast);
const formattedAst = format(adaptorAst);

const operations = formattedAst.formattedFunctions
  .concat(formattedAst.formattedVariables)
  .filter(function (op) {
    const public =
      (op.docs ? op.docs.tags : []).filter(function (tag) {
        return tag.title == 'public';
      }).length > 0;

    if (public && !op.valid) {
      console.log(
        '\x1b[31m%s\x1b[0m',
        ` ✗ operations tagged as @public must be properly documented; please double-check: "${op.name}"`
      );
      errors.push(`${op.name} may have invalid documentation`);
    }
    return public;
  });

//Parses functions from other files inside the same folder
var dirname = path.dirname(filename);
filepaths = ast
  .filter(function (item) {
    return item.type == 'VariableDeclaration';
  })
  .filter(function (item) {
    if (item.declarations[0].init.callee) {
      return (
        item.declarations[0].init.callee.name == 'require' &&
        item.declarations[0].init.arguments[0].value.includes('./')
      );
    }
  })
  .map(function (item) {
    return path.resolve(
      dirname,
      item.declarations[0].init.arguments[0].value + '.js'
    );
  });

exportsAst = filepaths.map(function (item) {
  var exportsFile = fs.readFileSync(item, 'utf8');
  console.log(`Parsing ${item}`);
  var astExport = babylon.parse(exportsFile, {
    sourceType: 'module',
  }).program.body;
  return selectExports(astExport);
});

//Imports function from language-common AST
if (
  !filename.includes('language-common') &&
  process.env.npm_package_name &&
  !process.env.npm_package_name.includes('language-common')
) {
  console.log('Gathering documentation for language-common');
  var commonPath = path.resolve(
    filename,
    '../../node_modules/language-common/ast.json'
  );

  var newCommonPath = path.resolve(
    filename,
    '../../node_modules/@openfn/language-common/ast.json'
  );

  var commonFile;
  try {
    commonFile = fs.readFileSync(commonPath, 'utf8');
  } catch (error) {
    commonFile = fs.readFileSync(newCommonPath, 'utf8');
  }

  if (commonFile) {
    var commonAst = JSON.parse(commonFile).operations;
  } else {
    var commonAst = [];
  }
} else {
  var commonAst = [];
}

//Checks for exported functions from other files inside the same folder
const formattedExports = exportsAst.map(function (item) {
  return format(item);
});

const exported = formattedExports.map(function (item) {
  const exp = item.formattedFunctions
    .concat(item.formattedVariables)
    .filter(c => {
      console.log(c.name);
      return adaptorAst.externalFunctions.includes(c.name);
    })
    .filter(function (p) {
      const public =
        (p.docs ? p.docs.tags : []).filter(function (tag) {
          return tag.title == 'public';
        }).length > 0;

      if (public && !p.valid) {
        console.log(
          '\x1b[31m%s\x1b[0m',
          ` ✗ functions tagged as @public must be properly documented; please double-check: "${p.name}"`
        );
        errors.push(`${p.name} may have invalid documentation`);
      }
      return public;
    });
  return exp;
});

// Checks for exported functions from language-common
var commons = commonAst.filter(i =>
  adaptorAst.externalFunctions.includes(i.name)
);

if (commons.length > 0) {
  console.log(
    'Documented the following exports from language-common:',
    JSON.stringify(
      commons.map(i => i.name),
      null,
      2
    )
  );
} else if (!filename.includes('language-common')) {
  console.log('\x1b[31m%s\x1b[0m', ` ✗ No common exports documented.`);
}

const finalAST = {
  operations,
  exports: exported,
  common: commons,
};

writeable = JSON.stringify(finalAST, null, '  ');
fs.writeFile(outputPath, writeable, err => {
  if (err) throw err;
  if (errors.length > 0) {
    console.log('\x1b[33m%s\x1b[0m', 'The AST has been written with errors:');
    console.log(JSON.stringify(errors, null, 2));
    console.log(
      '\x1b[33m%s\x1b[0m',
      "Please make sure you know what you're doing if you publish this as is. 🤔"
    );
  } else {
    console.log('The AST has been written.');
  }
});
