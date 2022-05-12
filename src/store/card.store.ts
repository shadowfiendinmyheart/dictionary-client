import { observable, action, makeObservable } from 'mobx';
import getTranslations, {
  getTranslationsRequest,
  TranslationsResponse,
} from '../api/card/findTranslations.api';
import { Language } from '../api/card/types';

const imagesMock = [
  'https://upload.wikimedia.org/wikipedia/commons/0/0e/Felis_silvestris_silvestris.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Zunge_raus.JPG/1200px-Zunge_raus.JPG',
  'https://icdn.lenta.ru/images/2019/10/06/13/20191006135047104/pwa_vertical_1280_55d23da46a4b99f74eedbba9ec98aa80.jpg',
  'https://img.gazeta.ru/files3/749/14276749/2in1-2021new-_1_-k32opiya-pic_32ratio_900x600-900x600-72725.jpg',
  'https://icdn.lenta.ru/images/2021/12/25/06/20211225060234816/pwa_vertical_1280_977f134a87826e9874cf3a1835e0ac15.jpg',
  'https://cdnn21.img.ria.ru/images/07e5/06/18/1738448523_0:54:864:540_1920x0_80_0_0_22bd72aa578b3fece6a89a620c95c4a1.jpg',
  'https://www.purina.ru/sites/default/files/2021-02/kot-ili-koshka-header%20smaller.jpg',
  'https://www.belanta.vet/vet-blog/wp-content/uploads/2019/09/1-6.jpg',
  'https://static.wikia.nocookie.net/fallout/images/f/fc/FO4HRTP_Cat.png/revision/latest?cb=20200829105031&path-prefix=ru',
  'https://ss.metronews.ru/userfiles/materials/169/1696646/858x429.jpg',
  'https://icdn.lenta.ru/images/2022/01/13/15/20220113155912401/square_1024_c8fcd6c9d390e08572df43eaf749f0f9.jpg',
  'https://doctor-veterinar.ru/media/k2/items/cache/675d28c04794e3c683f4419536c4c15f_L.jpg',
  'https://s13.stc.yc.kpcdn.net/share/i/instagram/B44solahwlo/wr-1280.webp',
];

type TranslationContextItem = {
  translation: string;
  context?: string[];
  isPicked: boolean;
};

export class CardStore {
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
  images: string[] = imagesMock;
  isTranslationsFetching = false;
  fromLanguage: Language = Language.Russian;
  toLanguage: Language = Language.English;
  isAssociationModal = false;
  isImagesModal = false;

  constructor() {
    makeObservable(this, {
      translationItems: observable,
      images: observable,
      isTranslationsFetching: observable,
      fromLanguage: observable,
      toLanguage: observable,
      isAssociationModal: observable,
      isImagesModal: observable,

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
    });
  }

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
  };

  public setToLanguage = (language: Language) => {
    this.toLanguage = language;
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

  public changeIsPickedItem = (index: number) => {
    this.translationItems[index].isPicked = !this.translationItems[index].isPicked;
  };
}
