import { observable, action, makeObservable, computed } from 'mobx';
import getTranslations, {
  getTranslationsRequest,
  TranslationsResponse,
} from '../api/card/findTranslations.api';
import { Language } from '../api/card/types';
import { DictionaryStore } from './dictionary.store';
import { Dictionary } from './types';

const imagesMock = [
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Felis_silvestris_silvestris.jpg',
    isPicked: false,
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Zunge_raus.JPG/1200px-Zunge_raus.JPG',
    isPicked: true,
  },
  {
    url: 'https://icdn.lenta.ru/images/2019/10/06/13/20191006135047104/pwa_vertical_1280_55d23da46a4b99f74eedbba9ec98aa80.jpg',
    isPicked: false,
  },
  {
    url: 'https://img.gazeta.ru/files3/749/14276749/2in1-2021new-_1_-k32opiya-pic_32ratio_900x600-900x600-72725.jpg',
    isPicked: false,
  },
  {
    url: 'https://icdn.lenta.ru/images/2021/12/25/06/20211225060234816/pwa_vertical_1280_977f134a87826e9874cf3a1835e0ac15.jpg',
    isPicked: false,
  },
  {
    url: 'https://cdnn21.img.ria.ru/images/07e5/06/18/1738448523_0:54:864:540_1920x0_80_0_0_22bd72aa578b3fece6a89a620c95c4a1.jpg',
    isPicked: false,
  },
  {
    url: 'https://www.purina.ru/sites/default/files/2021-02/kot-ili-koshka-header%20smaller.jpg',
    isPicked: false,
  },
  {
    url: 'https://www.belanta.vet/vet-blog/wp-content/uploads/2019/09/1-6.jpg',
    isPicked: false,
  },
  {
    url: 'https://static.wikia.nocookie.net/fallout/images/f/fc/FO4HRTP_Cat.png/revision/latest?cb=20200829105031&path-prefix=ru',
    isPicked: false,
  },
  {
    url: 'https://ss.metronews.ru/userfiles/materials/169/1696646/858x429.jpg',
    isPicked: false,
  },
  {
    url: 'https://icdn.lenta.ru/images/2022/01/13/15/20220113155912401/square_1024_c8fcd6c9d390e08572df43eaf749f0f9.jpg',
    isPicked: false,
  },
  {
    url: 'https://doctor-veterinar.ru/media/k2/items/cache/675d28c04794e3c683f4419536c4c15f_L.jpg',
    isPicked: false,
  },
  {
    url: 'https://s13.stc.yc.kpcdn.net/share/i/instagram/B44solahwlo/wr-1280.webp',
    isPicked: false,
  },
];

export type TranslationContextItem = {
  translation: string;
  context?: string[];
  isPicked: boolean;
};

export type ImageItem = {
  url: string;
  isPicked: boolean;
};

export type AssociationItem = {
  word: string;
  imageUrl: string;
  translations: string[];
  about?: string;
};

export class CardStore {
  private dictionaryStore: DictionaryStore;
  phrase = '';
  translationItems: TranslationContextItem[] = [
    {
      translation: 'test1',
      isPicked: false,
    },
    {
      translation: 'test2',
      context: ['hello test2 world!'],
      isPicked: false,
    },
    {
      translation: 'test3',
      isPicked: true,
    },
  ];
  imageItems: ImageItem[] = imagesMock;
  pickedImage = '';
  associationItems: AssociationItem[] = [];
  about = '';
  isTranslationsFetching = false;
  fromLanguage: Language = Language.Russian;
  toLanguage: Language = Language.English;
  isAssociationModal = false;
  isImagesModal = false;
  avalibleDictionaries: Dictionary[] = [];
  pickedDictionary: Dictionary = this.avalibleDictionaries[0];

  constructor(dictionaryStore: DictionaryStore) {
    makeObservable(this, {
      phrase: observable,
      translationItems: observable,
      imageItems: observable,
      pickedImage: observable,
      associationItems: observable,
      about: observable,
      isTranslationsFetching: observable,
      fromLanguage: observable,
      toLanguage: observable,
      isAssociationModal: observable,
      isImagesModal: observable,
      avalibleDictionaries: observable,
      pickedDictionary: observable,

      deleteTranslation: action.bound,
      checkAddTranslation: action.bound,
      setTranslations: action.bound,
      addTranslation: action.bound,
      getTranslationsFromApi: action.bound,
      setFromLanguage: action.bound,
      setToLanguage: action.bound,
      handleShufflePress: action.bound,
      setAssociationModal: action.bound,
      setImagesModal: action.bound,
      changeIsPickTranslationItem: action.bound,
      setPickImageItem: action.bound,
      setAbout: action.bound,
      addAssociationItem: action.bound,
      clearImagePicked: action.bound,
      clearTranslationPicked: action.bound,
      updateAvalibleDictionaries: action.bound,
      setPickedDictionaryByName: action.bound,

      isValidAssociation: computed,
    });

    this.dictionaryStore = dictionaryStore;
  }

  public setPhrase = (phrase: string) => {
    this.phrase = phrase;
  };

  public deleteTranslation = (translationToDelete: string) => {
    this.translationItems = this.translationItems.filter(
      (item) => item.translation !== translationToDelete,
    );
  };

  public checkAddTranslation = (translationToAdd: string) => {
    if (!translationToAdd) return false;

    const checkDuplicate = this.translationItems.find(
      (item) => item.translation.toLowerCase() === translationToAdd.toLowerCase(),
    );
    if (checkDuplicate) {
      console.log('duplicate here!');
      // show user alert
      return false;
    }

    return true;
  };

  public setTranslations = (translations: TranslationContextItem[]) => {
    this.translationItems = translations;
  };

  public addTranslation = (translationToAdd: TranslationContextItem) => {
    this.translationItems = [...this.translationItems, translationToAdd];
  };

  public getTranslationsFromApi = async (request: getTranslationsRequest) => {
    this.isTranslationsFetching = true;
    const response = await getTranslations(request);
    this.isTranslationsFetching = false;

    if (!response) return;

    const translationItems: TranslationContextItem[] = response.translation.map((t) => {
      return {
        translation: t,
        context: response.examples
          .filter((example) => example.from.includes(t))
          .map((filtredTranslations) => filtredTranslations.from),
        isPicked: false,
      };
    });

    return translationItems;
  };

  public setFromLanguage = (language: Language) => {
    this.fromLanguage = language;
    this.updateAvalibleDictionaries();
  };

  public setToLanguage = (language: Language) => {
    this.toLanguage = language;
    this.updateAvalibleDictionaries();
  };

  public handleShufflePress = () => {
    const temp = this.fromLanguage;
    this.setFromLanguage(this.toLanguage);
    this.setToLanguage(temp);
  };

  public setAssociationModal = (value: boolean) => {
    this.isAssociationModal = value;
  };

  public setImagesModal = (value: boolean) => {
    this.isImagesModal = value;
  };

  public changeIsPickTranslationItem = (index: number) => {
    this.translationItems[index].isPicked = !this.translationItems[index].isPicked;
  };

  public setPickImageItem = (url: string) => {
    this.imageItems.forEach((image) => {
      if (image.url === url) {
        this.pickedImage = image.url;
        image.isPicked = !image.isPicked;
        return;
      }

      image.isPicked = false;
    });
  };

  public setAbout = (about: string) => {
    this.about = about;
  };

  public addAssociationItem = () => {
    const item: AssociationItem = {
      word: this.phrase,
      imageUrl: this.pickedImage,
      translations: this.translationItems
        .filter((item) => item.isPicked)
        .map((item) => item.translation),
      about: this.about,
    };
    this.associationItems = [...this.associationItems, item];
  };

  public clearImagePicked = () => {
    this.pickedImage = '';
    for (const image of this.imageItems) {
      image.isPicked = false;
    }
  };

  public clearTranslationPicked = () => {
    for (const translation of this.translationItems) {
      translation.isPicked = false;
    }
  };

  public updateAvalibleDictionaries = () => {
    console.log('this.dictionaryStore.dictionaries', this.dictionaryStore.dictionaries);
    this.avalibleDictionaries = this.dictionaryStore.dictionaries.filter((dictionary) => {
      return dictionary.from === this.fromLanguage && dictionary.to === this.toLanguage;
    });
  };

  public setPickedDictionaryByName = (dictionaryName: string) => {
    for (const dictionary of this.avalibleDictionaries) {
      if (dictionary.name === dictionaryName) {
        this.pickedDictionary = dictionary;
        break;
      }
    }
  };

  get isValidAssociation() {
    let isTranslatePick = false;
    let isImagePick = false;

    for (const translation of this.translationItems) {
      if (translation.isPicked) {
        isTranslatePick = true;
        break;
      }
    }

    for (const image of this.imageItems) {
      if (image.isPicked) {
        isImagePick = true;
        break;
      }
    }

    if (!isTranslatePick || !isImagePick) {
      return false;
    }

    return true;
  }
}
