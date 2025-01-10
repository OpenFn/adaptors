import chai from 'chai';
import { execute } from '../src/Adaptor';
import { toUTF8 } from '../src/Utils';

const { expect } = chai;

describe('toUTF8', () => {
  it('Transliterate unicode to ASCII representation', async () => {
    const state = {
      connection: {},
    };

    // Run toUTF8 inside an execute block to ensure that any-ascii gets loaded correctly
    const convert = str => execute(state => toUTF8(str))(state);

    let result = await convert('άνθρωποι');
    expect(result).to.eql('anthropoi');

    // Misc
    result = await convert('☆ ♯ ♰ ⚄ ⛌');
    expect(result).to.equal('* # + 5 X');

    // Emojis
    result = await convert('👑 🌴');
    expect(result).to.eql(':crown: :palm_tree:');

    // Letterlike
    result = await convert('№ ℳ ⅋ ⅍');
    expect(result).to.eql('No M & A/S');

    // Ordinal coordinator
    result = await convert('Nhamaonha 6ª Classe 2023-10-09');
    expect(result).to.eql('Nhamaonha 6a Classe 2023-10-09');
  });
});
