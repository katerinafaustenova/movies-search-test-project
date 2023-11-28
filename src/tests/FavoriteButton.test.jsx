import renderer from "react-test-renderer";
import FavoriteButton from "../components/FavoriteButton";

describe("FavoriteButton", () => {
  const dataProvider = [
    { data: {}, description: "no props" },
    {
      data: {
        isFavorite: false,
        toggleFavorite: jest.fn(),
        positionTop: true,
      },
      description: "no id",
    },
    {
      data: {
        id: "tt12347",
        isFavorite: true,
        toggleFavorite: jest.fn(),
        positionTop: false,
      },
      description: "is favorite and standard position",
    },
    {
      data: {
        id: "tt12348",
        isFavorite: false,
        toggleFavorite: jest.fn(),
        positionTop: true,
      },
      description: "is not favorite and position top",
    },
  ];

  dataProvider.forEach((props) => {
    it(`renders correctly with ${props.description}`, () => {
      const tree = renderer.create(<FavoriteButton {...props.data} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
