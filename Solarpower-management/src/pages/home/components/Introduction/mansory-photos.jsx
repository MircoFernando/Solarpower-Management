import Masonry from '../../../../components/Masonry';
import Photo1 from '../../../../assets/markus-spiske-rNn_TU8dvoY-unsplash.jpg';
import Photo2 from '../../../../assets/nuno-marques-0GbrjL3vZF4-unsplash.jpg';
import Photo3 from '../../../../assets/siwawut-phoophinyo-S2Jxs3DXpyA-unsplash.jpg';
import Photo4 from '../../../../assets/siwawut-phoophinyo-S2Jxs3DXpyA-unsplash.jpg';
import Photo5 from '../../../../assets/siwawut-phoophinyo-JlhvFEVMwng-unsplash.jpg';
import Photo6 from '../../../../assets/american-public-power-association-XGAZzyLzn18-unsplash.jpg';

const MansoryPhotos = () => {

const items = [
    {
      id: "1",
      img: Photo1,
      url: "https://example.com/one",
      height: 400,
    },
    {
      id: "2",
      img: Photo2,
      url: "https://example.com/one",
      height: 250,
    },
    {
      id: "3",
      img: Photo3,
      url: "https://example.com/one",
      height: 600,
    },
    {
      id: "4",
      img: Photo4,
      url: "https://example.com/one",
      height: 600,
    },
    {
      id: "5",
      img: Photo5,
      url: "https://example.com/one",
      height: 600,
    },
    {
      id: "6",
      img: Photo6,
      url: "https://example.com/one",
      height: 600,
    },

    // ... more items
];



return (
<Masonry
  items={items}
  ease="power3.out"
  duration={1}
  stagger={0.05}
  animateFrom="bottom"
  scaleOnHover={true}
  hoverScale={0.95}
  blurToFocus={true}
  colorShiftOnHover={false}
    />

);

};

export default MansoryPhotos;