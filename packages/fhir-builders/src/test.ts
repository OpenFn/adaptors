// Ok so thi works beautifully
// it's something about you have to specify all generics,
// or none
// when I specificy one, it breaks
export function create<X, Y>(type: string, mixins: Y) {
  const result = {
    type,
  };

  return result as Y;
}

const a = create('a', { a: 1, b: 2 });
console.log(a);
