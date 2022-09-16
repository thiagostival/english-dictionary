interface IGetWord {
  phonetics: Array<{
    audio: string;
    text: string;
  }>;
  word: string;
  meanings: Array<{
    definitions: Array<{
      definition: string;
    }>;
    partOfSpeech: string;
  }>;
}

interface IErrorGetWord {
  title: string;
  message: string;
  resolution: string;
}

export { IGetWord, IErrorGetWord };
