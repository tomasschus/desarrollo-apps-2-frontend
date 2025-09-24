import { arraysACSV } from '../../core/utils/csv.utils';

describe('csv.utils', () => {
  describe('generateCSVDownload', () => {
    beforeAll(() => {
      global.URL.createObjectURL = jest.fn(() => 'blob:mock');
    });

    it('should generate a CSV file with the given rows and filename', async () => {
      const clickMock = jest.fn();
      const appendChildMock = jest
        .spyOn(document.body, 'appendChild')
        .mockImplementation(() => document.body);
      const removeChildMock = jest
        .spyOn(document.body, 'removeChild')
        .mockImplementation(() => document.body);
      const realCreateElement = document.createElement.bind(document);
      const createElementSpy = jest
        .spyOn(document, 'createElement')
        .mockImplementation((tagName: any) => {
          if (tagName === 'a') {
            return {
              setAttribute: jest.fn(),
              click: clickMock,
              get download() {
                // debe ser distinto de undefined para pasar el if del código
                return '';
              },
              set download(_val: string) {},
            } as any;
          }
          return realCreateElement(tagName);
        });

      arraysACSV(['a', 'b', 'c'], [['1', '2', '3']], 'test.csv');

      expect(global.URL.createObjectURL).toHaveBeenCalled();
      const blobArg = (global.URL.createObjectURL as jest.Mock).mock
        .calls[0][0] as Blob;
      expect(blobArg).toBeInstanceOf(Blob);
      expect(blobArg.type).toContain('text/csv');

      // Node test env: usar FileReader para leer el Blob
      const text = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(reader.error);
        reader.readAsText(blobArg);
      });
      expect(text).toBe('a,b,c\n1,2,3');

      expect(appendChildMock).toHaveBeenCalled();
      expect(clickMock).toHaveBeenCalled();
      expect(removeChildMock).toHaveBeenCalled();

      createElementSpy.mockRestore();
      appendChildMock.mockRestore();
      removeChildMock.mockRestore();
    });
  });
});
