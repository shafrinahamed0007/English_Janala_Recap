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
    <button
                    class="btn btn-outline btn-primary cursor-pointer hover:bg-transparent hover:text-primary hover:border-primary "><i
                        class="fa-solid fa-book-open" style="color: rgb(66, 42, 213);"></i> Learn - ${lesson.level_no}</button>`;

    levelContainer.append(levelDiv);
  }
};

loadData();
