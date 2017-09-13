const should = require("chai").should();
import { searchMorfix } from '../src/js/utils/xhr';
import cheerio from 'cheerio';

describe('Morfix http call', () => {
    let data;
    describe('check hebrew translation with "baby"', () => {
        it('http status is 200', async () => {
            const result = await searchMorfix('baby');
            const { status } = result;
            data = result.data;
            status.should.be.equal(200);
        });
    
        it('response is html', () => {
            data.should.be.a('string');
            data.should.contains('<html');
        });

        it('hebrew translation contains "תינוק"', () => {
            const $ = cheerio.load(data);
            const heWord0 =  $('div.heWord0');
            heWord0.length.should.be.equal(1);
            heWord0.find('div.translation_he').text().should.contains('תִּינוֹק');
        });
    });

    describe('check english translation with "אמא"', () => {
        it('http status is 200', async () => {
            const result = await searchMorfix(encodeURIComponent('אמא'));
            const { status } = result;
            data = result.data;
            status.should.be.equal(200);
        });
    
        it('response is html', () => {
            data.should.be.a('string');
            data.should.contains('<html');
        });

        it('english translation contains "mother"', () => {
            const $ = cheerio.load(data);
            const enWord0 = $('#translate_result0');
            enWord0.length.should.be.equal(1);
            enWord0.find('div.default_trans').text().toLowerCase().should.contains('mother');
        });
    });
    
    
});