interface IOrdenateParams {
  pageStart?: string;
  pageLength?: number;
  direction?: 'asc' | 'desc';
}

interface IResponseGetWord {
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

interface ISetWordsUser {
  email: string;
  item: string;
  data: {
    [x: string]: any;
  };
}

interface IGetWordsList extends IOrdenateParams {}

interface IGetWordsUser extends IOrdenateParams {
  email: string;
}

interface IGetWordUser {
  email: string;
  word: string;
}

interface IResponseGetWordsUser {
  isFavorite: boolean;
  isHistory: boolean;
  word: string;
}

export {
  IErrorGetWord,
  ISetWordsUser,
  IGetWordsList,
  IGetWordsUser,
  IGetWordUser,
  IResponseGetWord,
  IResponseGetWordsUser,
};
