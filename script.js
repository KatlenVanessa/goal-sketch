let draggedElement;

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

  document.body.appendChild(card);
}

function dragStart(e) {
  draggedElement = this;
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

board.addEventListener('drop', function () {
  if (draggedElement) {
    board.appendChild(draggedElement);
    draggedElement.style.position = 'absolute';
    draggedElement.style.left = `${event.clientX - board.offsetLeft}px`;
    draggedElement.style.top = `${event.clientY - board.offsetTop}px`;
  }
});

