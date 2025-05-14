document.querySelectorAll('.editable').forEach(element => {
  if (element.id !== 'profilePic') {
    element.addEventListener('click', () => {
      element.contentEditable = true;
      element.focus();
      element.classList.add('editing');
    });

    element.addEventListener('blur', () => {
      element.contentEditable = false;
      element.classList.remove('editing');
      element.classList.add('updated');
      setTimeout(() => element.classList.remove('updated'), 1000);
    });
  }
});

const profilePic = document.getElementById('profilePic');
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = 'image/*';
document.body.appendChild(fileInput);

profilePic.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      profilePic.src = event.target.result;
      profilePic.classList.add('updated');
      setTimeout(() => profilePic.classList.remove('updated'), 1000);
    };
    reader.readAsDataURL(file);
  }
});

const downloadBtn = document.getElementById('downloadBtn');
downloadBtn.addEventListener('click', (e) => {
  setTimeout(() => {
    document.getElementById('downloadBtn').style.display = 'none';
    html2canvas(document.querySelector("#resume"), { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      document.getElementById('downloadBtn').style.display = 'block';
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('result.pdf');
    })
  }, 1000);
});
document.getElementById('downloadBtn').addEventListener('click', function (e) {
  const wave = document.createElement('span');
  wave.className = 'wave';

  const rect = this.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  wave.style.width = wave.style.height = `${size}px`;
  wave.style.left = `${x}px`;
  wave.style.top = `${y}px`;

  this.appendChild(wave);

  setTimeout(() => wave.remove(), 600);
});

const style = document.createElement('style');
style.textContent = `
  @keyframes wave {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);