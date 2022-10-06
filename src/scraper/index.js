const { load } = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const cookiejar = require('axios-cookiejar-support');
const { findSourceMap } = require('module');
const request = require('request-promise');

async function main() {
  const target = await getTitlesAllPages('sinema');
  console.log(target);
}

async function getTitlesAllPages(channel) {
  let page = 1;
  let arr = [];
  while (true) {
    const newArr = await getTitles(channel, page);
    if (newArr.length == 0) break;
    arr = [...arr, ...newArr];
    page++;
  }
  return arr;
}

async function getTitles(channel, page = 1) {
  const url = `https://eksisozluk.com/basliklar/kanal/${channel}?p=${page}`;
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
      return {
        title,
        entryCount: span == '' ? 0 : parseInt(span),
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
    .map((i, e) => $(e).find('.index-link').text().replaceAll('#', '').trim())
    .get();
  return channelList;
}

main();
