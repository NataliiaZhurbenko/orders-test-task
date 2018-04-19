import express from 'express';
const app = express();
import path from "path";

app.use(express.static(path.resolve("./") + '/static')); // js, css, images

const server = app.listen(process.env.PORT || 5000, () => {
	console.log(`Express server listening on http://localhost:${server.address().port}`);
	console.log(path.resolve("./"));
});
