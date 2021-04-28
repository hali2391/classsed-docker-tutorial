const express = require('express')
const morgan = require('morgan')
const db = require('./db')
const PORT = process.env.PORT || 2000
const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const axios = require('axios');
const qs = require('query-string');
app.set('view engine', 'ejs');
app.set('views','./view')
app.use(express.static(__dirname + '/'));
var bodyParser = require('body-parser'); 
app.use(bodyParser.json());              
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/add_movie', async (req, res) => {
  const title=req.body.movie_name;
  const review=req.body.movie_review;
  const date=req.body.movie_date;
  if(title){
  await db('movie').insert(
    { 
        movie_title: title,
       review:review, 
       review_date: date
    })
  }
  
 
});
app.get('/', function(req, res) {
  res.render('pages/home', {
    my_title: "movies",
    items: '',
    error: false,
    message: ''
  });
});                                                                                                                                                   

app.post("/get_data", function(req, res) {
  const title = req.body.title;
  const id = req.body.id;
  const api_key ="736375c8";

  if(title) {
      axios({
          method: "get",
          url: `http://www.omdbapi.com/?t=${title}&apikey=${api_key}`,
          responseType: "json",
          data:' '
      })
      .then(response => {
        res.render('pages/home',{
        my_title: "movie search",
        items: response.data.results,
        message: "got results"
        })
      })
      
        .catch(err => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
             console.log(error);
      }});
  }
  else if (id) {
      axios({
          url: `http://www.omdbapi.com/?i=${id}&apikey=${api_key}`,
          method: "get",
          responseType: "json",
          data: ''
      })
      .then(response => {
        res.render('pages/home',{
        my_title: "movie search",
        items: response.data.results,
        message: "got results"
        })
      })
      
        .catch(err => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
             console.log(error);
      }});
  }
  else {
      renderPage("No id or title provided.", true);
  }
});

app.get('/get_reviews', function(req, res) {
	var id='SELECT id FROM movie;';
	var title='SELECT movie_title FROM movie;'; 
	var review ='SELECT review FROM movie;';
	var date='SELECT review_date FROM movie;';
	db.task('get-everything', task => {
		return task.batch([
			task.any(id),
			task.any(title),
			task.any(review),
			task.any(date),
		]);
	})
	.then(data => {
		console.log(data);
		res.render('pages/newReview',{
			my_title: "reviews", 
			data: data
		})
	})
	.catch(err => {
			console.log('error', err);
			res.render('pages/home', {
				my_title: 'database failed',
				data: '',
			})
	});

});

app.get('/get_reviews/search', function(req, res) {
	var t=player_id= req.query.title_search;
  var id=`SELECT id FROM movie WHERE movie_title like ${t};`;
	var title=`SELECT movie_title FROM movie WHERE movie_title like ${t};`; 
	var review =`SELECT review FROM movie WHERE movie_title like ${t};`;
	var date=`SELECT review_date FROM movie WHERE movie_title like ${t};`;
	db.task('get-everything', task => {
		return task.batch([
			task.any(id),
			task.any(title),
			task.any(review),
			task.any(date),
		]);
	})
	.then(data => {
		console.log(data);
		res.render('pages/newReview',{
			my_title: "search result", 
			data: data
		})
	})
	.catch(err => {
			console.log('error', err);
			res.render('pages/home', {
				my_title: 'database failed',
				data: '',
			})
	});

});



app.listen(PORT, () => console.log(`Server up at http://localhost:${PORT}`))
