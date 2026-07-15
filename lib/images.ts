export type SliderImage = {
  id: string;
  name: string;
  dataUrl: string;
  createdAt: string;
};

const STORAGE_KEY = "crm_slider_images";

export function getSliderImages(): SliderImage[] {
  if (typeof window === "undefined") return [];

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as SliderImage[];
  } catch {
    return [];
  }
}

function saveSliderImages(images: SliderImage[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
}

export function addSliderImage(input: { name: string; dataUrl: string }) {
  const image: SliderImage = {
    id: crypto.randomUUID(),
    name: input.name,
    dataUrl: input.dataUrl,
    createdAt: new Date().toISOString(),
  };
  saveSliderImages([...getSliderImages(), image]);
  return image;
}

export function deleteSliderImage(id: string) {
  saveSliderImages(getSliderImages().filter((img) => img.id !== id));
}
