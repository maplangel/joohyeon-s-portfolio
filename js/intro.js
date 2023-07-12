console.clear();

// the disintegration effect is taken from --> https://www.youtube.com/watch?v=5DGZhWDl6XM 


gsap.registerPlugin(ScrollTrigger);

const COUNT = 75;
const REPEAT_COUNT = 3;

const capture = document.querySelector("#capture");

function createCanvases(captureEl) {
	html2canvas(captureEl).then((canvas) => {
		const width = canvas.width;
		const height = canvas.height;
		const ctx = canvas.getContext("2d");
		const imageData = ctx.getImageData(0, 0, width, height);
		let dataList = [];
		captureEl.style.display = "none";

		for (let i = 0; i < COUNT; i++) {
			dataList.push(ctx.createImageData(width, height));
		}

		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				for (let l = 0; l < REPEAT_COUNT; l++) {
					const index = (x + y * width) * 4;
					const dataIndex = Math.floor(
						(COUNT * (Math.random() + (2 * x) / width)) / 3
					);
					for (let p = 0; p < 4; p++) {
						dataList[dataIndex].data[index + p] = imageData.data[index + p];
					}
				}
			}
		}

		dataList.forEach((data, i) => {
			let clonedCanvas = canvas.cloneNode();
			clonedCanvas.getContext("2d").putImageData(data, 0, 0);
			clonedCanvas.className = "capture-canvas";
			document.body.appendChild(clonedCanvas);

			const randomAngle = (Math.random() - 0.5) * 2 * Math.PI;
			const randomRotationAngle = 30 * (Math.random() - 0.5);

			let tl = gsap.timeline({
				scrollTrigger: {
					scrub: 1,
					start: () => 0,
					end: () => window.innerHeight * 2
				}
			});

			tl.to(clonedCanvas, {
				duration: 1,
				rotate: randomRotationAngle,
				translateX: 10 * Math.sin(randomAngle),
				translateY: 40 * Math.cos(randomAngle),
				opacity: 0,
				delay: (i / dataList.length) * 2
			});
		});
	});
}

const images = gsap.utils.toArray("img");

imagesLoaded(images).on("always", () => {
	createCanvases(capture);
});

// 타이핑=======================================================
const $text = document.querySelector(".typing .text");

// 글자 모음
const letters = [
	'"안녕하세요, 웹퍼블리셔 서주현 입니다."'
];

// 글자 입력 속도
const speed = 150;
let i = 0;

// 타이핑 효과
const typing = async () => {  
  const letter = letters[i].split("");
  
  while (letter.length) {
    await wait(speed);
    $text.innerHTML += letter.shift(); 
  }
  
  // 잠시 대기
  await wait(80000);
  
  // 지우는 효과
  remove();
}

// 글자 지우는 효과
const remove = async () => {
  const letter = letters[i].split("");
  
  while (letter.length) {
    await wait(speed);
    
    letter.pop();
    $text.innerHTML = letter.join(""); 
  }
  
  // 다음 순서의 글자로 지정, 타이핑 함수 다시 실행
  i = !letters[i+1] ? 0 : i + 1;
  typing();
}

// 딜레이 기능 ( 마이크로초 )
function wait(ms) {
  return new Promise(res => setTimeout(res, ms))
}

// 초기 실행
setTimeout(typing, 0);

// 버블==============================================
// you can change the hue and amount lit-ness via data attributes on html

// clips the value to given range
const clip = (v, min, max = Infinity) => {
  if (v < min) return min;
  else if (v > max) return max;
  else return v;
};

// generated random value from given range
const randRange = (min, max) => Math.random() * max + min;

// create bubble on x and y position inside target with given hue theme
function bubble(x, y, rect, hue, target) {
  // variables
  const size = randRange(20, rect.width / 5);
  const circleHue = hue + randRange(-20, 20);
  const animDuration = randRange(clip(size ** 2/1000, 1), 6) 
  const zIndex = Math.random() < 0.1 ? 2 : -1;
  // apply to DOM
  const circle = document.createElement("span");
  circle.className = "lit";
  circle.style.left = x + "px";
  circle.style.top = y + "px";
  circle.style.width = size + "px";
  circle.style.height = size + "px";
  circle.style.background = `hsl(${circleHue}deg, 100%, 60%)`;
  circle.style.zIndex = zIndex
  circle.style.animationDuration = animDuration + "s";
  target.appendChild(circle);
}

document.querySelectorAll("[data-lit-hue]").forEach((target) => {
  const rect = target.getBoundingClientRect();
  const hue = Number(target.getAttribute("data-lit-hue"));
  const count = Number(target.getAttribute("data-lit-count") || 50);

  for (let i = 0; i < count; i++) {
    const x = randRange(0, rect.width);
    const y = randRange(0, rect.height);
    bubble(x, y, rect, hue, target);
  }
});
