function findAccountById(accounts, id) {
  let foundId = accounts.find((account) => account.id === id);
  return foundId;
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) =>
    accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
  );
  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  let totalBorrows = 0;
  for (let iter1 = 0; iter1 < books.length; iter1++) {
    for (let iter2 = 0; iter2 < books[iter1].borrows.length; iter2++) {
      if (account.id === books[iter1].borrows[iter2].id) {
        totalBorrows += 1;
      }
    }
  }
  return totalBorrows;
}

function getBooksPossessedByAccount(account, books, authors) {
  let result = [];
  let borrowMatch = [];
  books.forEach((item) => {
    const borrowed = item.borrows;
    const book = {
      id: item.id,
      title: item.title,
      genre: item.genre,
      authorId: item.authorId,
      author: {},
      borrows: {},
    };

    const { id, title, genre, authorId, author, borrows } = book;

    borrowed.forEach((borrow) => {
      if (borrow.id === account.id && borrow.returned === false) {
        result.push(book);
        borrowMatch.push(borrow);
        book.borrows = borrowMatch;
        book.author = authors.filter((auth) => auth.id === book.authorId)[0];
      }
    });
  });
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
