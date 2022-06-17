exports.Category = {
  Cards: ({ id: categoryId }, { filter }, { db }) => {
    const categoryCards = db.Cards.filter(
      (Card) => Card.categoryId === categoryId
    );
    let filteredCategoryCards = categoryCards;

    if (filter) {
      if (filter.onSale === true) {
        filteredCategoryCards = filteredCategoryCards.filter(
          (Card) => {
            return Card.onSale;
          }
        );
      }
    }

    return filteredCategoryCards;
  },
};
