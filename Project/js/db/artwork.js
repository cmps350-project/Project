const artworks = [
    {
      id: 1,
      title: "The Starry Night",
      artist: "Vincent van Gogh",
      category: "Post-Impressionism",
      medium: "Oil on canvas",
      year: 1889,
      price: 1000000000,
      description: "A swirling post-impressionist landscape depicting a vibrant night sky with crescent moon and large stars, overlooking a village with church steeple.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1200px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    },
    {
      id: 2,
      title: "The Persistence of Memory",
      artist: "Salvador Dalí",
      category: "Surrealism",
      medium: "Oil painting",
      year: 1931,
      price: 20000000,
      description: "A surrealist masterpiece featuring melting clocks draped over barren tree branches on a desolate landscape.",
      imageUrl: "https://www.reproduction-gallery.com/catalogue/uploads/1522662218_large-image_dali-persistence-of-memory-lg.jpg",
    },
    // Added 6 more artworks
    {
      id: 3,
      title: "Guernica",
      artist: "Pablo Picasso",
      category: "Cubism",
      medium: "Oil on canvas",
      year: 1937,
      price: 400000000,
      description: "A large, powerful anti-war piece in greyscale cubist style, portraying the chaos and suffering of a bombed city.",
      imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgtd35hlaQS94eu8MfZaOh2BpnmPPVQ4H7kzfz1kNoNW3ZfK3Eua0d-Yhbt_CfOfRAppyoD2mIQPSEr-FFVvCSya51wZPsmZRK-duXgbumZVsLeXSoV0-76Lti8oHtjkZfy17GZRJ_wTdLm/s1600/guernica.jpg",
    },
    {
      id: 4,
      title: "Water Lilies",
      artist: "Claude Monet",
      category: "Impressionism",
      medium: "Oil on canvas",
      year: 1899,
      price: 30000000,
      description: "An impressionist painting capturing a peaceful garden pond with colorful water lilies and a Japanese bridge.",
      imageUrl: "https://www.artic.edu/iiif/2/3c27b499-af56-f0d5-93b5-a7f2f1ad5813/full/843,/0/default.jpg",
    },
    {
      id: 5,
      title: "The Scream",
      artist: "Edvard Munch",
      category: "Expressionism",
      medium: "Tempera on cardboard",
      year: 1893,
      price: 120000000,
      description: "An expressionist work featuring a lone figure with an anguished face and open mouth, standing on a bridge with a swirling blood-red sky.",
      imageUrl: "https://i.ebayimg.com/images/g/I1kAAOSwO4pj8kvW/s-l1200.webp",
    },

    {
      id: 6,
      title: "The Great Wave off Kanagawa",
      artist: "Hokusai",
      category: "Ukiyo-e",
      medium: "Woodblock print",
      year: 1830,
      price: 500000, 
      description: "A Japanese woodblock print depicting a massive wave threatening boats near Mount Fuji, known for its dynamic composition and bold use of color.",
      imageUrl: "https://images.metmuseum.org/CRDImages/as/original/DP130155.jpg",

    },
    {
      id: 8,
      title: "The Son of Man",
      artist: "René Magritte",
      category: "Surrealism",
      medium: "Oil on canvas",
      year: 1964,
      price: 25000000,
      description: "A man in a bowler hat with an apple obscuring his face, creating a sense of mystery and identity exploration.",
      imageUrl: "https://www.singulart.com/blog/wp-content/uploads/2024/03/The-Son-of-Man.jpg",
    },
    
  ];
  


export function getArtworks(){
    return artworks
}