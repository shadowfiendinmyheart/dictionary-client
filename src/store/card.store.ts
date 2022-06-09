import { observable, action, makeObservable, computed } from 'mobx';
import findTranslations, {
  findTranslationsRequest,
} from '../api/card/findTranslations.api';
import { Language } from '../api/card/types';
import { DictionaryStore } from './dictionary.store';
import { Dictionary } from './types';

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
  translationItems: TranslationContextItem[] = [];
  imageItems: ImageItem[] = [];
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
      setAssociationItems: action.bound,
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

  public getTranslationsFromApi = async (request: findTranslationsRequest) => {
    this.isTranslationsFetching = true;
    const response = await findTranslations(request);
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
    this.updateAvalibleDictionaries();
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

  public setImageItems = (images: ImageItem[]) => {
    this.imageItems = images;
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

  public setAssociationItems = (items: AssociationItem[]) => {
    this.associationItems = items;
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
    this.avalibleDictionaries = this.dictionaryStore.dictionaries.filter((dictionary) => {
      return (
        dictionary.fromLanguage.name === this.fromLanguage &&
        dictionary.toLanguage.name === this.toLanguage
      );
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
