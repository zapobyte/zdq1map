

// Define the pin positions
import pins from '../assets/pins.json';

export const drawMap = (img: HTMLImageElement) => {
    // Create a canvas element
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    // Get the context of the canvas
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');

    // Draw the image onto the canvas
    context?.drawImage(img, 0, 0, img.width, img.height);

    // Get the image data from the canvas
    const imageData: ImageData | undefined = context?.getImageData(0, 0, img.width, img.height);

    // Loop through the image data byte by byte
    if (imageData) {
        for (let i: number = 0; i < imageData.data.length; i += 4) {
            // Get the red, green, blue, and alpha values
            const r = imageData.data[i];
            const g = imageData.data[i + 1];
            const b = imageData.data[i + 2];
            const a = imageData.data[i + 3];

            // Do something with the values (e.g. manipulate the color)

            // Set the new red, green, blue, and alpha values
            imageData.data[i] = r;
            imageData.data[i + 1] = g;
            imageData.data[i + 2] = b;
            imageData.data[i + 3] = a;
        }


        // Put the modified image data back onto the canvas
        context?.putImageData(imageData, 0, 0);

        // Add the canvas to the document
        const main: HTMLElement | null = document.getElementById('main')
        main?.appendChild(canvas);

        // Loop through the pin positions and add clickable pins to the canvas
        for (let j = 0; j < pins.length; j++) {
            // Get the pin position
            const pinPosition = pins[j];
            // Create a new pin element
            const pin = document.createElement('div');
            pin.classList.add('pin');
            pin.style.width = pinPosition.width;
            pin.style.height = pinPosition.height;
            pin.style.left = pinPosition.x + 'px';
            pin.style.top = pinPosition.y + 'px';

            // Add a click event listener to the pin
            pin.addEventListener('click', function () {
                alert('You clicked the pin at position (' + pinPosition.x + ', ' + pinPosition.y + ')!');
            });

            // Add the pin to the document
            document.body.appendChild(pin);
        }
    }
}