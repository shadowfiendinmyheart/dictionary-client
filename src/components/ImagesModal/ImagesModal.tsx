import React from 'react';
import { observer } from 'mobx-react';
import { Modal } from 'native-base';
import { Entypo } from '@native-base/icons';
import { useStore } from '../../store/root.store';
import i18n, { localizationTokens } from '../../localization';
import ImagesGrid from '../ImagesGrid';

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

const ImagesModal = () => {
  const { cardStore } = useStore();
  const { isImagesModal, setImagesModal } = cardStore;

  return (
    <Modal isOpen={isImagesModal} size={'xl'} onClose={() => setImagesModal(false)}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Создание ассоциации</Modal.Header>
        <Modal.Body>
          <ImagesGrid images={imagesMock} onImagePress={() => alert('Click!')} />
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default observer(ImagesModal);
