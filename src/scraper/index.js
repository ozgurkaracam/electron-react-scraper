const { load } = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const cookiejar = require('axios-cookiejar-support');
const { findSourceMap } = require('module');
const request = require('request-promise');
const turkishtoenglish = require('../utils/turkishtoenglish');

async function main() {
  const target = await getChannels();
  // const target = await getTitlesAllPages('eğitim');
  console.log(target);
}

async function getTitlesAllPages(channel) {
  // channel = turkishtoenglish(channel);
  let page = 1;
  let arr = [];
  while (true) {
    const newArr = await getTitles(channel, page);
    if (newArr.length == 0) break;
    arr = [...arr, ...newArr];
    page++;
  }
  return arr.sort((a, b) => {
    return a.entryCount > b.entryCount ? -1 : 1;
  });
}

async function getTitles(channel, page = 1) {
  // const url = `https://eksisozluk.com/basliklar/kanal/${channel}?p=${page}`;
  const url = `${channel}?p=${page}`;
  const data = await request.get(url, {});

  const $ = await load(data);
  const titles = $('.topic-list.partial li')
    .filter((index, el) => {
      return !$(el).attr('id');
    })
    .map((i, e) => {
      let title = $(e).text().trim();
      const span = $(e).find('small').text().trim();
      title = title.replace(` ${span}`, '');
      const link = `https://eksisozluk.com${$(e).find('a').attr('href')}`;
      return {
        title,
        link,
        entryCount: span == '' ? 1 : parseInt(span),
      };
    })
    .get();
  return titles;
}

async function getChannels() {
  const url = 'https://eksisozluk.com/kanallar';
  const { data } = await axios.get(url);
  const $ = await load(data);
  const channelList = $('#channel-follow-list li')
    .map((i, e) => ({
      title: $(e).find('.index-link').text().replaceAll('#', '').trim(),
      link: `https://eksisozluk.com${$(e).find('.index-link').attr('href')}`,
    }))
    .get();
  return channelList;
}
module.exports = {
  getChannels,
  getTitlesAllPages,
};

// main();
