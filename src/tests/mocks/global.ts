jest.mock('../../services/firebase', () => {});
jest.mock('../../services/endpoints', () => {});

const mockAudio = {
  pause: jest.fn(),
  play: jest.fn(),
};
HTMLMediaElement.prototype.play = mockAudio.play;
HTMLMediaElement.prototype.pause = mockAudio.pause;

const mockClipboard = {
  writeText: jest.fn(),
};
Object.assign(navigator, {
  clipboard: mockClipboard,
});

window.BroadcastChannel = jest.fn();

const defaultIntersection = {
  root: null,
  rootMargin: '',
  thresholds: [],
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  takeRecords: jest.fn(),
};
window.IntersectionObserver = jest.fn().mockReturnValue(defaultIntersection);

export { mockAudio, mockClipboard, defaultIntersection };
