var express = require('express');
var path = require('path');
const config = require('./config');
var morgan = require('morgan');

const indexRouter = require('./routes/index');
const activeRouter = require('./routes/active');
const areaInfoRouter = require('./routes/area_info');
const areaLookupRouter = require('./routes/area_lookup');
const overviewRouter = require('./routes/overview');
const propertylistRouter = require('./routes/property_list');
const propertyMetricsRouter = require('./routes/property_metrics');
const searchRouter = require('./routes/search');
const topRouter = require('./routes/top');

const app = express();

//logger
app.use(morgan('common'));

const PORT = config.port;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', indexRouter);
app.use('/api/active', activeRouter);
app.use('/api/area_info', areaInfoRouter);
app.use('/api/area_lookup', areaLookupRouter);
app.use('/api/overview', overviewRouter);
app.use('/api/property_list', propertylistRouter);
app.use('/api/property_metrics', propertyMetricsRouter);
app.use('/api/search', searchRouter);
app.use('/api/top', topRouter);

// error handler
app.use(function(err, req, res, next) {
	try {
		// set locals, only providing error in development
		res.locals.message = err.message;
		res.locals.error = req.app.get('env') === 'development' ? err : {};

		// render the error page
		res.status(err.status || 500);
		res.render('error');
	} catch (error) {
		console.log(error);
	}
});

app.listen(PORT, () => {
  	console.log(`Find the server at: http://localhost:${PORT}/`); // eslint-disable-line no-console
});

module.exports = app;
