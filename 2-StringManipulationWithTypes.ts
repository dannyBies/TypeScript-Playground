type ReplaceWhitespaceWithDash<TName extends string> = // Pass in a generic string type
  TName extends `${infer TFirstName} ${infer TLastName}` // Check if the string contains whitespace by inferring two string before and after.
    ? `${TFirstName}-${TLastName}` // If it does, use the inferred types to create a new type by combining them with a dash in the middle.
    : never; // If no whitespace could be found we have encountered an unsupported scenario, E.g. ReplaceWhitespaceWithDash<"DannyvanderBiezen">;

type MyNameWithSingleDash = ReplaceWhitespaceWithDash<"Danny van der Biezen">;
// ^ type: "danny-van der Biezen"

type ReplaceWhitespaceWithDashRecv<TName extends string> =
  TName extends `${infer TFirstWord} ${infer TRest}`
    ? // Recursively call this type by passing in the TName without the first word.
      // "Danny van der Biezen" -> "van der Biezen" -> "der Biezen" -> "Biezen" -> "der-biezen" -> "van-der-biezen" -> "Danny-van-der-Biezen"
      `${TFirstWord}-${ReplaceWhitespaceWithDashRecv<TRest>}`
    : TName; // We need a base case, if no more whitespace could be found we return the remaining string.

type MyNameWithAllDashes =
  ReplaceWhitespaceWithDashRecv<"Danny van der Biezen">;
// ^ type: "danny-van-der-Biezen"

type ReplaceStringWithStringRecv<
  TName extends string,
  TSubstring extends string,
  TReplacement extends string
> = TName extends `${infer TFirstPart}${TSubstring}${infer TRest}`
  ? `${TFirstPart}${TReplacement}${ReplaceStringWithStringRecv<
      TRest,
      TSubstring,
      TReplacement
    >}`
  : TName;

type MyNameWithNReplacedWithZ = ReplaceStringWithStringRecv<
  "Danny van der Biezen",
  "n",
  "Z"
>;
// ^ type: "DaZZy vaZ der BiezeZ"
