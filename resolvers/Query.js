exports.Query = {
  hello: (parent, args, context) => "World",
  Cards: (parent, { filter }, { db }) => {
    let filteredCards = db.Cards;
    if (filter) {
      const { onSale, avgRating } = filter;
      if (onSale) {
        filteredCards = filteredCards.filter((Card) => {
          return Card.onSale;
        });
      }
      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filteredCards = filteredCards.filter((Card) => {
          let sumRating = 0;
          let numberOfReviews = 0;
          db.reviews.forEach((review) => {
            if (review.CardId === Card.id) {
              sumRating += review.rating;
              numberOfReviews++;
            }
          });
          const avgCardRating = sumRating / numberOfReviews;

          return avgCardRating >= avgRating;
        });
      }
    }

    return filteredCards;
  },
  Card: (parent, { id }, { db }) => {
    return db.Cards.find((Card) => Card.id === id);
  },
  categories: (parent, args, { db }) => db.categories,
  category: (parent, { id }, { db }) => {
    return db.categories.find((category) => category.id === id);
  },
};
