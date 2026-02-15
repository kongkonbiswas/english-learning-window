const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};
const clearActiveClass = () => {
  const lessonButtons = document.getElementsByClassName("lesson-btn");
  for (let btn of lessonButtons) {
    btn.classList.remove("btn-active");
  }
};
const loadLessonDetails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then((res) => res.json())
    .then((data) => {
      clearActiveClass();
      const clickedLesson = document.getElementById(`lesson-${id}`);
      clickedLesson.classList.add("btn-active");
      displayLessonWord(data.data);
    });
};
const loadWordDetails = async (id) => {
  await fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    .then(async (res) => await res.json())
    .then((data) => {
      // console.log(data);
      displayWordDetails(data.data);
    });
};
const displayWordDetails = (word) => {
  console.log(word);
  const wordDetailsBox = document.getElementById("word-details-container");
  wordDetailsBox.innerHTML = "Hello form Js";
  document.getElementById("word_modal").showModal();
};

const displayLessonWord = (words) => {
  const lessonDetailsContainer = document.getElementById("word-container");
  lessonDetailsContainer.innerHTML = "";

  if (words.length === 0) {
    lessonDetailsContainer.innerHTML = `<div class="text-center col-span-full rounded-xl font-bangla">
        <img src="./assets/alert-error.png" class="mx-auto"  alt="" />
        <p class="font-medium text-gray-400 py-1">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="font-bold text-3xl">নেক্সট Lesson এ যান</h2>
      </div>`;
    return;
  }
  words.forEach((word) => {
    // console.log(word);
    const wordDiv = document.createElement("div");
    wordDiv.innerHTML = `
        <div
        class="bg-white rounded-2xl text-center shadow-sm py-10 px-5 space-y-4"
      >
        <h2 class="font-bold text-xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
        <p class="font-semibold">Meaning /Pronunciation </p>
        <div class="font-medium font-bangla text-2xl">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "প্রণালী পাওয়া যায়নি"}</div>
        <div class="flex justify-between items-center">
          <button onclick="loadWordDetails('${word.id}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
        `;
    lessonDetailsContainer.append(wordDiv);
  });
};
const displayLessons = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  for (let lesson of lessons) {
    // console.log(lesson);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
            <button id="lesson-${lesson.level_no}" onclick="loadLessonDetails(${lesson.level_no})" class="btn btn-primary btn-outline lesson-btn">
            <i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
                `;
    levelContainer.append(btnDiv);
  }
};
loadLessons();
