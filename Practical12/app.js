// Library Book Tracker - jQuery DOM, events, Web Storage and AJAX

const BOOKS_KEY = "libraryBooks";      // localStorage key
const SEARCH_KEY = "lastSearch";       // sessionStorage key

// ---------- Web Storage helpers ----------
function loadBooks() {
  try {
    return JSON.parse(localStorage.getItem(BOOKS_KEY)) || [];
  } catch (e) {
    return [];
  }
}
function saveBooks(list) {
  localStorage.setItem(BOOKS_KEY, JSON.stringify(list));
}

// ---------- small UI helpers ----------
let msgTimer;
function showMsg(text, kind) {
  clearTimeout(msgTimer);
  $("#msg").removeClass("ok info bad").addClass(kind).text(text).show();
  msgTimer = setTimeout(function () { $("#msg").fadeOut(250); }, 3500);
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

function nextId(list) {
  let max = 100;
  $.each(list, function (i, b) {
    const n = parseInt(String(b.id).replace("B-", ""), 10);
    if (n > max) max = n;
  });
  return "B-" + (max + 1);
}

// ---------- render the table ----------
function render() {
  const books = loadBooks();
  const term = $("#search").val().trim().toLowerCase();
  const genre = $("#filterGenre").val();
  const readFilter = $("#filterRead").val();

  // rebuild the genre dropdown from the data (keep current choice)
  const genres = [];
  $.each(books, function (i, b) { if ($.inArray(b.genre, genres) === -1) genres.push(b.genre); });
  const $g = $("#filterGenre");
  const keep = $g.val() || "All";
  $g.empty().append('<option value="All">All genres</option>');
  $.each(genres.sort(), function (i, g) { $g.append($("<option>").val(g).text(g)); });
  $g.val(genres.indexOf(keep) !== -1 ? keep : "All");

  const shown = $.grep(books, function (b) {
    const matchText = (b.title + " " + b.author).toLowerCase().indexOf(term) !== -1;
    const matchGenre = $g.val() === "All" || b.genre === $g.val();
    const matchRead = readFilter === "all" || (readFilter === "read" ? b.read : !b.read);
    return matchText && matchGenre && matchRead;
  });

  const $body = $("#bookBody").empty();
  if (shown.length === 0) {
    $body.append('<tr class="empty"><td colspan="7">No books to show. Add one or load from the server.</td></tr>');
  }
  $.each(shown, function (i, b) {
    $body.append(
      '<tr data-id="' + b.id + '" class="' + (b.read ? "is-read" : "") + '">' +
        "<td>" + escapeHtml(b.id) + "</td>" +
        '<td class="t">' + escapeHtml(b.title) + "</td>" +
        "<td>" + escapeHtml(b.author) + "</td>" +
        "<td>" + escapeHtml(b.genre) + "</td>" +
        "<td>" + escapeHtml(b.year) + "</td>" +
        '<td><span class="pill ' + (b.read ? "yes" : "no") + '">' + (b.read ? "Read" : "Unread") + "</span></td>" +
        '<td><button class="small toggle">' + (b.read ? "Mark Unread" : "Mark Read") + "</button> " +
        '<button class="small del">Delete</button></td>' +
      "</tr>"
    );
  });

  const total = books.length;
  const read = $.grep(books, function (b) { return b.read; }).length;
  $("#sTotal").text(total);
  $("#sRead").text(read);
  $("#sUnread").text(total - read);
  $("#sPct").text(total ? Math.round(read * 100 / total) + "%" : "0%");
}

// ---------- AJAX ----------
function loadFromServer(url) {
  $("#ajaxStatus").text("Requesting " + url + " ...");
  $.ajax({
    url: url,
    type: "GET",
    dataType: "json",
    cache: false
  })
    .done(function (data) {
      const books = loadBooks();
      let added = 0;
      $.each(data, function (i, item) {
        const exists = $.grep(books, function (b) { return b.id === item.id; }).length > 0;
        if (!exists) { books.push(item); added++; }
      });
      saveBooks(books);
      render();
      $("#ajaxStatus").text("Success (HTTP 200)");
      showMsg(data.length + " records received, " + added + " new book(s) added.", "ok");
    })
    .fail(function (xhr, status, error) {
      $("#ajaxStatus").text("Failed (" + (xhr.status || "no response") + ")");
      showMsg("Could not load " + url + ". Run the page from a local server.", "bad");
    })
    .always(function () {
      $("#ajaxTime").text(new Date().toLocaleTimeString());
    });
}

// ---------- events ----------
$(document).ready(function () {
  // restore the last search typed in this browser tab (sessionStorage)
  $("#search").val(sessionStorage.getItem(SEARCH_KEY) || "");
  render();

  // submit : add a book
  $("#bookForm").on("submit", function (e) {
    e.preventDefault();
    const title = $("#title").val().trim();
    const author = $("#author").val().trim();
    const year = parseInt($("#year").val(), 10);
    const thisYear = new Date().getFullYear();

    if (title === "" || author === "") {
      $("#formErr").text("Title and author are required.");
      return;
    }
    if (isNaN(year) || year < 1000 || year > thisYear) {
      $("#formErr").text("Enter a valid year between 1000 and " + thisYear + ".");
      return;
    }
    $("#formErr").text("");

    const books = loadBooks();
    books.unshift({ id: nextId(books), title: title, author: author, genre: $("#genre").val(), year: year, read: false });
    saveBooks(books);
    render();
    this.reset();
    showMsg('"' + title + '" added and saved to localStorage.', "ok");
  });

  // click : AJAX buttons
  $("#loadBtn").on("click", function () { loadFromServer("books.json"); });
  $("#badBtn").on("click", function () { loadFromServer("missing-file.json"); });

  // click : clear everything (with confirm)
  $("#clearBtn").on("click", function () {
    if (confirm("Remove all books from localStorage?")) {
      localStorage.removeItem(BOOKS_KEY);
      render();
      showMsg("All books removed.", "info");
    }
  });

  // keyup : live search (also remembered in sessionStorage)
  $("#search").on("keyup input", function () {
    sessionStorage.setItem(SEARCH_KEY, $(this).val());
    render();
  });

  // change : filters
  $("#filterGenre, #filterRead").on("change", render);

  // event delegation : buttons inside rows that are created dynamically
  $("#bookBody").on("click", ".toggle", function () {
    const id = $(this).closest("tr").data("id");
    const books = loadBooks();
    $.each(books, function (i, b) { if (b.id === id) b.read = !b.read; });
    saveBooks(books);
    render();
  });

  $("#bookBody").on("click", ".del", function () {
    const id = $(this).closest("tr").data("id");
    saveBooks($.grep(loadBooks(), function (b) { return b.id !== id; }));
    render();
    showMsg("Book " + id + " deleted.", "info");
  });
});
