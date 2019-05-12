declare interface IIdentityCardWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  nameLabel: string;
  surnameLabel: string;
  birthPlaceLabel: string;
  birthDateLabel: string;
  genderLabel: string;
  fotoLabel: string;
}

declare module 'IdentityCardWebPartStrings' {
  const strings: IIdentityCardWebPartStrings;
  export = strings;
}
