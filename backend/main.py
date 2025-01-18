from fastapi import FastAPI, Response

from models.image_mix import ImageMix

app = FastAPI()


@app.post("/image")
async def image_mix(props: ImageMix):
    return Response(content=props.style, media_type="image/png")
