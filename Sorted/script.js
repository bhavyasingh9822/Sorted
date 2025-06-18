const arrayContainer = document.getElementById("array-container");
const speedInput = document.getElementById("speedRange");

let array = [];
let speed = parseInt(speedInput.value);

// Listen for speed changes
speedInput.addEventListener("input", () => {
  speed = parseInt(speedInput.value);
});

function renderArray(arr) {
  arrayContainer.innerHTML = "";
  arr.forEach(num => {
    const bar = document.createElement("div");
    bar.className = "array-bar";
    bar.textContent = num;
    arrayContainer.appendChild(bar);
  });
}

function renderNewArray() {
  array = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
  renderArray(array);
  
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
  let bars = document.getElementsByClassName("array-bar");
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].style.backgroundColor = "red";
      bars[j + 1].style.backgroundColor = "red";
      await sleep(speed);

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        renderArray(array);
        bars = document.getElementsByClassName("array-bar");
        await sleep(speed);
      }

      bars[j].style.backgroundColor = "rgb(8, 8, 151)";
      bars[j + 1].style.backgroundColor = "rgb(8, 8, 151)";
    }
    bars[array.length - i - 1].style.backgroundColor = "green";
  }
  bars[0].style.backgroundColor = "green";
}

async function selectionSort() {
  let bars = document.getElementsByClassName("array-bar");
  for (let i = 0; i < array.length; i++) {
    let minIdx = i;
    bars[minIdx].style.backgroundColor = "orange";

    for (let j = i + 1; j < array.length; j++) {
      bars[j].style.backgroundColor = "red";
      await sleep(speed);

      if (array[j] < array[minIdx]) {
        bars[minIdx].style.backgroundColor = "rgb(8, 8, 151)";
        minIdx = j;
        bars[minIdx].style.backgroundColor = "orange";
      } else {
        bars[j].style.backgroundColor = "rgb(8, 8, 151)";
      }
    }

    [array[i], array[minIdx]] = [array[minIdx], array[i]];
    renderArray(array);
    bars = document.getElementsByClassName("array-bar");
    await sleep(speed);
    bars[i].style.backgroundColor = "green";
  }
}

async function insertionSort() {
  let bars = document.getElementsByClassName("array-bar");

  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    bars[i].style.backgroundColor = "orange";
    await sleep(speed);

    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j--;
      renderArray(array);
      bars = document.getElementsByClassName("array-bar");
      await sleep(speed);
    }

    array[j + 1] = key;
    renderArray(array);
    bars = document.getElementsByClassName("array-bar");
    bars[i].style.backgroundColor = "green";
  }

  for (let i = 0; i < array.length; i++) {
    bars[i].style.backgroundColor = "green";
  }
}

async function quickSort(arr, low, high) {
  if (low < high) {
    const pi = await partition(arr, low, high);
    await quickSort(arr, low, pi - 1);
    await quickSort(arr, pi + 1, high);
  } else if (low >= 0 && high >= 0 && low < arr.length && high < arr.length) {
    document.getElementsByClassName("array-bar")[low].style.backgroundColor = "green";
    document.getElementsByClassName("array-bar")[high].style.backgroundColor = "green";
  }
}

async function partition(arr, low, high) {
  let pivot = arr[high];
  let i = low - 1;
  let bars = document.getElementsByClassName("array-bar");

  bars[high].style.backgroundColor = "orange";

  for (let j = low; j < high; j++) {
    bars[j].style.backgroundColor = "red";
    await sleep(speed);

    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      renderArray(arr);
      bars = document.getElementsByClassName("array-bar");
      await sleep(speed);
    }
    bars[j].style.backgroundColor = "rgb(8, 8, 151)";
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  renderArray(arr);
  await sleep(speed);

  return i + 1;
}

async function mergeSort(arr, left, right) {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);
  await mergeSort(arr, left, mid);
  await mergeSort(arr, mid + 1, right);
  await merge(arr, left, mid, right);
}

async function merge(arr, left, mid, right) {
  const n1 = mid - left + 1;
  const n2 = right - mid;

  const L = arr.slice(left, mid + 1);
  const R = arr.slice(mid + 1, right + 1);

  let i = 0, j = 0, k = left;
  let bars = document.getElementsByClassName("array-bar");

  while (i < n1 && j < n2) {
    bars[k].style.backgroundColor = "red";
    await sleep(speed);

    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    renderArray(arr);
    bars = document.getElementsByClassName("array-bar");
    k++;
  }

  while (i < n1) {
    arr[k++] = L[i++];
    renderArray(arr);
    bars = document.getElementsByClassName("array-bar");
    await sleep(speed);
  }

  while (j < n2) {
    arr[k++] = R[j++];
    renderArray(arr);
    bars = document.getElementsByClassName("array-bar");
    await sleep(speed);
  }

  for (let i = left; i <= right; i++) {
    bars[i].style.backgroundColor = "green";
  }
}

renderNewArray();
