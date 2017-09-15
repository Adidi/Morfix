const should = require("chai").should();
import { searchMorfix } from '../src/js/utils/xhr';
import cheerio from 'cheerio';

describe('Morfix http call', () => {
    let data, $;
    describe('check hebrew translation for "baby"', () => {
        it('http status is 200', async () => {
            const result = await searchMorfix('baby');
            const { status } = result;
            data = result.data;
            status.should.be.equal(200);
        });
    
        it('response is html', () => {
            data.should.be.a('string');
            $ = cheerio.load(data);
            $('title').length.should.be.equal(1);
        });

        it('hebrew translation contains "תינוק"', () => {
            const heWord0 =  $('div.heWord0');
            heWord0.length.should.be.equal(1);
            heWord0.find('div.translation_he').text().should.contains('תִּינוֹק');
        });
    });

    describe('check english translation for "אמא"', () => {
        it('http status is 200', async () => {
            const result = await searchMorfix(encodeURIComponent('אמא'));
            const { status } = result;
            data = result.data;
            status.should.be.equal(200);
        });
    
        it('response is html', () => {
            data.should.be.a('string');
            $ = cheerio.load(data);
            $('title').length.should.be.equal(1);
        });

        it('english translation contains "mother"', () => {
            const enWord0 = $('#translate_result0');
            enWord0.length.should.be.equal(1);
            enWord0.find('div.default_trans').text().toLowerCase().should.contains('mother');
        });
    });
    
    
});