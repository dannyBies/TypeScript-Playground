const objectWithPrimitives = {
  bool: true,
  string: "",
  number: 1,
  object: {
    bool: false,
    string: "",
    number: 2,
  },
};

// Create type based on existing keys in object.
type ObjectConvertedToType = typeof objectWithPrimitives;
/** ^ type:
  {
    bool: boolean;
    string: string;
    number: number;
    object: {
        bool: boolean;
        string: string;
        number: number;
    };
}
 */

type KeysOfType = keyof ObjectConvertedToType;
// ^ type: "string" | "number" | "object" | "bool"

type UnionType = {
  // Set the keys based on the keys of the object.
  [K in KeysOfType]: {
    [K2 in K]: typeof objectWithPrimitives[K]; // Set the value of the key to the type of the object with the given key.
  };
}[KeysOfType]; // Map over the keys to remove parent keys. E.g. { string: { string: string } } -> { string: string }
/** ^ type: 
  {
    string: string;
  } | 
  {
    number: number;
  } | 
  {
    object: {
        bool: boolean;
        string: string;
        number: number;
    };
  } | 
  {
    bool: boolean;
  }
 */

// If `objectWithPrimitives` ever changes its keys this will automatically be reflected in the `UnionType` with full type-safety.
const objectVariable: UnionType = {
  object: {
    number: 1,
    bool: true,
    string: "",
  },
};

const stringVariable: UnionType = {
  string: "hello",
};
