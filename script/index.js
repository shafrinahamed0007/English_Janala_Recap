const loadData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/levels/all",
  );
  const data = await res.json();
  displayLessons(data.data);
};

const displayLessons = async (lessons) => {
  const levelContainer = document.getElementById("levelContainer");
  levelContainer.innerHTML = "";

  for (let lesson of lessons) {
    const levelDiv = document.createElement("div");
    levelDiv.innerHTML = `
    <button onclick = "loadLevelWord(${lesson.level_no})"
                    class="btn btn-outline btn-primary cursor-pointer hover:bg-transparent hover:text-primary hover:border-primary "><i
                        class="fa-solid fa-book-open" style="color: rgb(66, 42, 213);"></i> Learn - ${lesson.level_no}</button>`;

    levelContainer.append(levelDiv);
  }
};

const loadLevelWord = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/level/${id}`,
  );
  const data = await res.json();
  displayLevelWord(data.data);
};

const displayLevelWord = async (data) => {
  // console.log(data)
  const wordContainer = document.getElementById("wordContainer");
  wordContainer.innerHTML = "";
  data.forEach((info) => {
    const wordDiv = document.createElement("div");
    wordDiv.innerHTML = `
      <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5">
                <h2>${info.word}</h2>
                <p>Meaning / Pronounciation</p>
                <div>
                    <h2 class="fontBangla">"${info.meaning}" / "${info.pronunciation}"</h2>
                </div>


            </div>
    `;
    wordContainer.append(wordDiv);
  });
};

loadData();
