const { v4: uuid } = require("uuid");

exports.Mutation = {
  addCategory: (parent, { input }, { db }) => {
    const { name } = input;

    const newCategory = {
      id: uuid(),
      name,
    };

    db.categories.push(newCategory);

    return newCategory;
  },
  addCard: (parent, { input }, { db }) => {
    const { name, image, price, onSale, quantity, categoryId } = input;

    const newCard = {
      id: uuid(),
      name,
      image,
      price,
      onSale,
      quantity,
      categoryId,
    };

    db.Cards.push(newCard);

    return newCard;
  },
  addReview: (parent, { input }, { db }) => {
    const { date, title, comment, rating, CardId } = input;

    const newReview = {
      id: uuid(),
      date,
      title,
      comment,
      rating,
      CardId,
    };

    db.reviews.push(newReview);

    return newReview;
  },
  deleteCategory: (parent, { id }, { db }) => {
    db.categories = db.categories.filter((category) => category.id !== id);
    db.Cards = db.Cards.map((Card) => {
      if (Card.categoryId === id)
        return {
          ...Card,
          categoryId: null,
        };
      else return Card;
    });
    return true;
  },
  deleteCard: (parent, { id }, { db }) => {
    db.Cards = db.Cards.filter((Card) => Card.id !== id);
    db.reviews = db.reviews.filter((review) => review.CardId !== id);
    return true;
  },
  deleteReview: (parent, { id }, { db }) => {
    db.reviews = db.reviews.filter((review) => review.id !== id);
    return true;
  },
  updateCategory: (parent, { id, input }, { db }) => {
    const index = db.categories.findIndex((category) => category.id === id);
    if (index === -1) return null;
    db.categories[index] = {
      ...db.categories[index],
      ...input,
    };
    return db.categories[index];
  },
  updateCard: (parent, { id, input }, { db }) => {
    const index = db.Cards.findIndex((Card) => Card.id === id);
    if (index === -1) return null;
    db.Cards[index] = {
      ...db.Cards[index],
      ...input,
    };
    return db.Cards[index];
  },
  updateReview: (parent, { id, input }, { db }) => {
    const index = db.reviews.findIndex((review) => review.id === id);
    db.reviews[index] = {
      ...db.reviews[index],
      ...input,
    };
    return db.reviews[index];
  },
};
