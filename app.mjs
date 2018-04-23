import express from 'express';
const app = express();
import path from "path";
import routes from './server/routes.mjs';

app.use(express.static(path.resolve("./") + '/client')); // js, css, images


app.use('/api/', routes);

const server = app.listen(process.env.PORT || 5000, () => {
	console.log(`Express server listening on http://localhost:${server.address().port}`);
});
