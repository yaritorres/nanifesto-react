export default function cleanDate (posts) {
  for (let i = 0; i < posts.length; i++) {
    posts[i].date_posted = posts[i].date_posted.split('').splice(0, 10).join('');
  }

  return posts;
}