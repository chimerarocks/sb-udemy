import { Section15Page } from './app.po';

describe('section15 App', () => {
  let page: Section15Page;

  beforeEach(() => {
    page = new Section15Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
