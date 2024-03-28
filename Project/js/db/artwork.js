const artworks = [
  {
    id: 1,
    title: "Jelly Fish",
    artist: "René Magritte",
    category: "Visual",
    medium: "Water Pen",
    year: 1964,
    price: 25000000,
    quantity: 8,
    description: "A man in a bowler hat with an apple obscuring his face, creating a sense of mystery and identity exploration.",
    images: {
      url: "https://i.postimg.cc/9XTrfgY7/jellyfish.jpg",
      alternate: "https://i.postimg.cc/8ch5nszH/jellyfish-alternate.png",
    }
  },
  {
    id: 2,
    title: "Octopus",
    artist: "René Magritte",
    category: "Visual",
    medium: "Water Pen",
    year: 1964,
    price: 25000000,
    quantity: 8,
    description: "A man in a bowler hat with an apple obscuring his face, creating a sense of mystery and identity exploration.",
    images: {
      url: "https://i.postimg.cc/JzThFfM9/octopus.jpg",
      alternate: "https://i.postimg.cc/j2rqNK4J/octopus-alternate.png",
    }
  },
  {
    id: 3,
    title: "Star Fish",
    artist: "René Magritte",
    category: "Visual",
    medium: "Water pen",
    year: 1964,
    price: 25000000,
    quantity: 8,
    description: "A gorgeous bluish sha",
    images: {
      url: "https://i.postimg.cc/zXFvCLMD/starfish.jpg",
      alternate: "https://i.postimg.cc/G2DhH9GC/starfish-alternate.png",
    }
  },
  {
    id: 4,
    title: "Sea Shell",
    artist: "René Brown",
    category: "Visual",
    medium: "Water pen",
    year: 1964,
    price: 25000000,
    quantity: 8,
    description: "Awash in a captivating turquoise, the shell glows like a jewel unearthed from the ocean depths. Its surface isn't a flat expanse of color, but a tapestry woven with subtle variations. Lighter shades dance along its ridges, catching the light and creating a pearlescent sheen. ",
    images: {
      url: "https://i.postimg.cc/kgM4fJ3Q/shell.jpg",
      alternate: "https://i.postimg.cc/qqXJxY1D/shell-alternate.png",
    }
  },
    {
      id: 5,
      title: "Color Merge",
      artist: "Dan Fink",
      category: "Surrealism",
      medium: "Oil painting",
      year: 2002,
      price: 30000,
      quantity: 1,
      description: "Showing how earth's natural colors compliment eachother",
      images: {
        url: "https://i.pinimg.com/564x/7e/6e/01/7e6e013daa364527089bf36de82cb4eb.jpg",
        alternate: "https://i.postimg.cc/QMq9qSdt/Color-Merge-alternate.png",
      }
    },
    {
      id: 6,
      title: "Peacebirds",
      artist: "Dan Fink",
      category: "Surrealism",
      medium: "Oil painting",
      year: 2012,
      price: 5000,
      quantity: 2,
      description: "if world peace exists, this is what will swarm our skies",
      images: {
        url: "https://i.pinimg.com/564x/d3/85/c9/d385c9264b48dd0557865e2b3edadab5.jpg",
        alternate: "https://i.postimg.cc/mkPPBsNz/peacebirds-alternate.png",
      }
    },
    {
      id: 7,
      title: "Water Lilies",
      artist: "Claude Monet",
      category: "Impressionism",
      medium: "Oil on canvas",
      year: 1899,
      price: 30000000,
      quantity: 8,
      description: "An impressionist painting capturing a peaceful garden pond with colorful water lilies and a Japanese bridge.",
      images: {
        url: "https://i.pinimg.com/564x/02/73/35/027335401cbc18f329ab9646b365646b.jpg",
        alternate: "https://i.pinimg.com/564x/e3/f0/74/e3f074e2b8571b3801a10049a378d309.jpg",
      }
    },
    {
      id: 8,
      title: "The Artist Garden",
      artist: "Claude Monet",
      category: "Impressionism",
      medium: "Oil on canvas",
      year: 1899,
      price: 30000000,
      quantity: 8,
      description: "One of his famous paintings, “The Artist's Garden at Vétheuil,” features Monet's young son and other members of his extended household. The artwork showcases a flat landscape with yellow sunflowers in the background that are emphasized by the play of light and shadows.",
      images: {
        url: "https://d7hftxdivxxvm.cloudfront.net/?height=800&quality=85&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FFIT_Nqdbo7GG-LF0izE4Dw%2Fnormalized.jpg&width=632",
        alternate: "https://www.pomegranate.com/cdn/shop/products/9628_03_869x2800.jpg?v=1692259991",
      }
    },
    {
      id: 9,
      title: "Bride Over Pond Of Water Lillies",
      artist: "Claude Monet",
      category: "Impressionism",
      medium: "Oil on canvas",
      year: 1899,
      price: 30000000,
      quantity: 8,
      description: " Claude Monet's The Japanese Bridge, which sits over a pond of water lilies, shares the tranquility of a man-made garden with its viewer. ",
      images: {
        url: "https://collectionapi.metmuseum.org/api/collection/v1/iiif/437127/796089/restricted",
        alternate: "https://pathosstudio.uk/cdn/shop/products/claude-monet-bridge-over-a-pond-of-water-lilies-poster-style-734229.jpg?v=1710766022&width=1946",
      }
    },
    {
      id: 10,
      title: "Stary Night",
      artist: "Edvard Munch",
      category: "Expressionism",
      medium: "Tempera on cardboard",
      year: 1893,
      price: 120000000,
      quantity: 4,
      description: "Edvard Munch imbued the picture with psychological meaning. The moonlight bathes the woman's face in a silvery light, giving it a ghostly appearance, while also casting an ominous black shadow behind her.",
      images: {
        url: "https://d7hftxdivxxvm.cloudfront.net/?height=800&quality=85&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FnXXWN7N3oigJ3zzMkMYaiA%2Fnormalized.jpg&width=678",
        alternate: "https://m.media-amazon.com/images/I/71wBnjlKQ9L.jpg",
      }
    },
    {
      id: 11,
      title: "Moonlight",
      artist: "Edvard Munch",
      category: "Expressionism",
      medium: "Tempera on cardboard",
      year: 1895,
      price: 180000000,
      quantity: 4,
      description: "Land and sea are locked in an embrace in which each advances toward and recedes from the other.",
      images: {
        url: "https://ms01.nasjonalmuseet.no/iip/?iiif=/tif/NG.M.02815_PUBLISERING.tif/full/1200,/0/default.jpg",
        alternate: "https://ih1.redbubble.net/image.4715812828.2875/fposter,small,wall_texture,square_product,600x600.u2.jpg",
      }
    },
    {
      id: 12,
      title: "The Great Wave off Kanagawa",
      artist: "Hokusai",
      category: "Ukiyo-e",
      medium: "Woodblock print",
      year: 1830,
      price: 500000, 
      quantity: 8,
      description: "A Japanese woodblock print depicting a massive wave threatening boats near Mount Fuji, known for its dynamic composition and bold use of color.",
      images: {
        url: "https://i.guim.co.uk/img/media/d47a49ca454dcff593ee10a158f40526b2cede35/0_0_3000_2071/master/3000.jpg?width=1010&quality=45&auto=format&fit=max&dpr=2&s=d8af6e60283052bf102409278ea7e206",
        alternate: "https://i.pinimg.com/originals/cd/ec/63/cdec6305704dc4d8a9c78e32435c2342.jpg",
      }

    },
    {
      id: 13,
      title: "TFuji from Gotenyama",
      artist: "Hokusai",
      category: "Ukiyo-e",
      medium: "Woodblock print",
      year: 1830,
      price: 500000, 
      quantity: 8,
      description: "Another of the Fuji series, in this print we see the traditional festive occasion of a hanami (cherry-blossom viewing party), which to this day is a celebrated event throughout Japan. Outside a teahouse, people dance with folding fans and Mt Fuji rises into a blue sky.",
      images: {
        url: "https://i.guim.co.uk/img/media/2607c51054fb8d36fe9d4266705ff94968e218a9/0_0_5220_3543/master/5220.jpg?width=1010&quality=45&auto=format&fit=max&dpr=2&s=83c29cba038b51301d09b18f959d4997",
        alternate: "https://m.media-amazon.com/images/I/71ZbvsrVT8L.jpg",
      }

    },
    {
      id: 14,
      title: "Falling Mist Waterfall at Mount Kurokami",
      artist: "Hokusai",
      category: "Ukiyo-e",
      medium: "Woodblock print",
      year: 1830,
      price: 500000, 
      quantity: 8,
      description: "A Japanese woodblock print depicting a massive wave threatening boats near Mount Fuji, known for its dynamic composition and bold use of color.",
      images: {
        url: "https://i.guim.co.uk/img/media/808aa646d5d957d7b41bcdabd51b8c19f6bb5f99/0_0_2154_3000/master/2154.jpg?width=1010&quality=45&auto=format&fit=max&dpr=2&s=1ddb68de4fbc19e56f67da903b8d617f",
        alternate: "https://m.media-amazon.com/images/I/71rL2rvT3TL.jpg",
      }

    },
    
  ];
  


export function getArtworks(){
    return artworks
}

export function getArtworkById(id){
  const artworkIndex = artworks.findIndex((artwork) => artwork.id == id)
  return artworks[artworkIndex]
}