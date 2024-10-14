let draggedElement = null;
let offsetX = 0;
let offsetY = 0;

function createCard(type) {
  const card = document.createElement('div');
  card.classList.add('card', type);
  card.setAttribute('draggable', true);

  // Adicionar textarea para inserir texto
  const textarea = document.createElement('textarea');
  textarea.placeholder = type === 'card1' ? 'Edit Card 1' : 'Edit Card 2';

  // Função para ajustar o tamanho do textarea e do card automaticamente
  textarea.addEventListener('input', function () {
    autoResize(textarea, card);
  });

  // Adicionar o textarea ao card
  card.appendChild(textarea);
  
  // Add drag event listeners
  card.addEventListener('dragstart', dragStart);
  card.addEventListener('dragend', dragEnd);

  // Adicionar o card ao container (um ao lado do outro)
  document.getElementById('card-container').appendChild(card);
}

function dragStart(e) {
  draggedElement = this;
  offsetX = e.clientX - this.getBoundingClientRect().left; // Cálculo da posição do mouse em relação ao card
  offsetY = e.clientY - this.getBoundingClientRect().top;
  setTimeout(() => this.style.display = 'none', 0);
}

function dragEnd() {
  this.style.display = 'flex';
  draggedElement = null;
}

// Função para ajustar o tamanho do textarea e do card
function autoResize(textarea, card) {
  textarea.style.height = 'auto';  // Resetar altura do textarea
  textarea.style.height = textarea.scrollHeight + 'px';  // Ajustar a altura do textarea

  // Se o textarea ultrapassar o tamanho fixo do card, aumentar a altura do card
  if (textarea.scrollHeight > card.clientHeight) {
    card.style.height = textarea.scrollHeight + 20 + 'px';  // Ajustar altura do card para o tamanho do textarea
  }
}

const board = document.getElementById('board');

// Board events for drag and drop
board.addEventListener('dragover', function (e) {
  e.preventDefault();
});

board.addEventListener('drop', function (e) {
  e.preventDefault();
  if (draggedElement) {
    // Obter a posição do mouse ao soltar o card
    const mouseX = e.clientX - board.offsetLeft - offsetX;
    const mouseY = e.clientY - board.offsetTop - offsetY;

    // Calcular as dimensões do card
    const cardWidth = draggedElement.offsetWidth;
    const cardHeight = draggedElement.offsetHeight;

    // Limitar a posição do card para dentro do board
    const newLeft = Math.max(0, Math.min(mouseX, board.clientWidth - cardWidth));
    const newTop = Math.max(0, Math.min(mouseY, board.clientHeight - cardHeight));

    // Ajustar a posição do card ao ser solto
    draggedElement.style.position = 'absolute';
    draggedElement.style.left = `${newLeft}px`;
    draggedElement.style.top = `${newTop}px`;

    board.appendChild(draggedElement); // Mover o card para o board
  }
});
