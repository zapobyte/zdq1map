

// Define the pin positions
export const generateMap = (container: string, img: HTMLImageElement, pins: any) => {
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
    const app: HTMLElement | null = document.getElementById('app');
    if (app && imageData) {
        // Loop through the image data byte by byte
        for (let i: number = 0; i < imageData.data.length; i += 4) {
            // Get the red, green, blue, and alpha values
            const r = imageData.data[i];
            const g = imageData.data[i + 1];
            const b = imageData.data[i + 2];
            const a = imageData.data[i + 3];

            // Set the new red, green, blue, and alpha values
            imageData.data[i] = r;
            imageData.data[i + 1] = g;
            imageData.data[i + 2] = b;
            imageData.data[i + 3] = a;
        }

        // Put the modified image data back onto the canvas
        context?.putImageData(imageData, 0, 0);
        for (var j = 0; j < pins.length; j++) {
            // Get the pin position
            const pinData = pins[j];

            // Create a new pin element
            const pin = document.createElement('div');
            pin.style.width = pinData.width + 'px';
            pin.style.height = pinData.height + 'px';
            pin.classList.add('pin');
            pin.style.left = pinData.x + 'px';
            pin.style.top = pinData.y + 'px';
            const span = document.createElement('span');
            span.innerHTML = pinData.name;
            span.classList.add('pin-element');
            pin.appendChild(span);

            // Add a click event listener to the pin
            pin.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation()
                const event = new CustomEvent("pin-click", { detail: pinData });
                // Dispatch the event.
                canvas.dispatchEvent(event);
            });

            // Add the pin to the document
            app.appendChild(pin);
            
            // Bring the pin text towards center of the pin
            if (span.offsetWidth - 5 > pin.offsetWidth) {
                span.style.marginLeft = `-${(span.offsetWidth / 4)}px`;
            }
            span.style.paddingTop = `${(pin.offsetHeight)}px`;
        }
    }

    // Add the canvas to the document
    const main: HTMLElement | null = document.querySelector(container);
    if (main) {
        main.appendChild(canvas);
    }

}