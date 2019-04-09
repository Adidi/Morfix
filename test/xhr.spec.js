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
            const el =  $('div.normal_translation_div');
            el.text().should.contains('תִּינוֹק');
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
            const el =  $('div.normal_translation_div');
            el.text().toLowerCase().should.contains('mother');
        });
    });
    
    
});