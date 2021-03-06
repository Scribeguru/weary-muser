'use strict';

import { articles } from './articles.js';

let url = 'http://localhost:3000/index.html';

function renderArticle() {
  const title = document.getElementById('titleWrapper');
  const body = document.getElementById('bodyWrapper');
  const scrollBtn = document.getElementById('scrollTop');
  if (url === window.location.href) {
    title.innerHTML = articles[0].title;
    body.innerHTML = articles[0].body;
  } else {
    title.innerHTML = articles.find(
    article => url+article.queryStr === window.location.href).title;
    body.innerHTML = articles.find(
    article => url+article.queryStr === window.location.href).body;
  }
  siftSearch(title);
  loadTitleAndUrlForShare(title);
  shareButtons();
  scrollBtn.addEventListener('click', scrollToTop);
}

function siftSearch(title) {
  const newer = document.getElementById('siftNewer');
  const older = document.getElementById('siftOlder');
  let currentPos = articles.findIndex(article => article.title === title.innerHTML);
  console.log('entry number '+articles[currentPos].id);
  (currentPos > 0) ?
  newer.href = articles[currentPos - 1].queryStr :
  newer.removeAttribute('href');
  (currentPos < articles.length - 1) ?
  older.href = articles[currentPos + 1].queryStr :
  older.removeAttribute('href');
  (!newer.href) ?
  newer.classList.add('newest') :
  newer.classList.remove('newest');
  (!older.href) ?
  older.classList.add('oldest') :
  older.classList.remove('oldest');
}

function loadTitleAndUrlForShare(title) {
  const wearymuser = document.getElementById('wearymuser');
  document.getElementById('ogTitle').setAttribute('content', title.innerHTML);
  document.getElementById('ogUrl').setAttribute('content', window.location.href);
  if (title.innerHTML === articles[0].title) {
    wearymuser.firstElementChild.removeAttribute('href');
  } else {
    wearymuser.firstElementChild.href = 'index.html';
    wearymuser.classList.add('wearymuser-click');
  }
}

// Most social media sharing is as simple as adding your url to the end of
// their sharing path. Snapchat requires you to use their SDK.
function shareButtons() {
  const twitter = document.getElementById('twitter');
  const facebook = document.getElementById('facebook');
  const reddit = document.getElementById('reddit');
  const tumblr = document.getElementById('tumblr');
  const copyLink = document.getElementById('copyLink');

  twitter.addEventListener('click', () => {
    twitter.target = '_blank';
    twitter.href = 'https://twitter.com/intent/tweet?url=' + window.location.href;
  });
  facebook.addEventListener('click', () => {
    facebook.target = '_blank';
    facebook.href = 'https://www.facebook.com/sharer/sharer.php?u=' + window.location.href;
  })
  reddit.addEventListener('click', () => {
    reddit.target = '_blank';
    reddit.href = 'https://www.reddit.com/submit?url=' + window.location.href;
  });
  tumblr.addEventListener('click', () => {
    tumblr.target = '_blank';
    tumblr.href = 'https://www.tumblr.com/widgets/share/tool?shareSource=legacy&canonicalUrl=' + window.location.href;
  });
  copyLink.addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href);
    alert('This entry\'s link has been copied to your clipboard.');
  });
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

renderArticle();