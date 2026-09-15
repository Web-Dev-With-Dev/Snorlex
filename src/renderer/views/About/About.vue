<template>
  <div>
    <FtCard class="card">
      <h2>
        <FontAwesomeIcon
          :icon="['fas', 'info-circle']"
          class="headingIcon"
        />
        {{ $t("About.About") }}
      </h2>
      <section class="brand">
        <img
          class="logo"
          src="../../assets/img/snorlex_header_logo.png"
          :alt="$t('About.About')"
        >
        <div class="version">
          {{ versionNumber }} {{ $t("About.Beta") }}
        </div>
      </section>
      <section class="about-chunks">
        <figure
          v-for="chunk in chunks"
          :key="chunk.title"
          class="chunk"
        >
          <img
            v-if="chunk.image"
            class="icon chunk-avatar"
            :src="chunk.image"
            :alt="chunk.title"
          >
          <FontAwesomeIcon
            v-else-if="chunk.icon"
            class="icon"
            :icon="chunk.icon"
          />
          <h3 class="title">
            {{ chunk.title }}
          </h3>
          <div
            v-safer-html="chunk.content"
            class="content"
          />
        </figure>
      </section>
    </FtCard>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import FtCard from '../../components/ft-card/ft-card.vue'
import { vSaferHtml } from '../../directives/vSaferHtml.js'
import devProfileImg from '../../assets/img/dev_gondaliya.jpg'

import { ABOUT_BITCOIN_ADDRESS } from '../../../constants'
import packageDetails from '../../../../package.json'

const { t } = useI18n()

const versionNumber = `v${packageDetails.version}`

const chunks = computed(() => [
  {
    image: devProfileImg,
    title: 'Developer',
    content: [
      '<a href="https://www.linkedin.com/in/dev-gondaliya/" target="_blank">Dev Gondaliya</a>',
      '<a href="https://github.com/Web-Dev-With-Dev" target="_blank">GitHub: Web-Dev-With-Dev</a>',
    ].join('<br>'),
  },
  {
    icon: ['fab', 'github'],
    title: t('About.Source code'),
    content: [
      '<a href="https://github.com/Web-Dev-With-Dev/Snorlex" lang="en" dir="ltr">GitHub: Web-Dev-With-Dev/Snorlex</a>',
      t('About.Licensed under the {licenseLink}', {
        licenseLink: `<a href="https://www.gnu.org/licenses/agpl-3.0.en.html">${t('About.AGPLv3')}</a>`,
      }),
    ].join('<br>'),
  },
  {
    icon: ['fas', 'exclamation-circle'],
    title: t('About.Report a problem'),
    content: [
      `<a href="https://github.com/Web-Dev-With-Dev/Snorlex/issues">${t('About.GitHub issues')}</a>`,
      t('About.Please check for duplicates before posting'),
    ].join('<br>'),
  },
  {
    icon: ['fas', 'globe'],
    title: t('About.Website'),
    content: '<a href="https://github.com/Web-Dev-With-Dev/Snorlex">https://github.com/Web-Dev-With-Dev/Snorlex</a>',
  },
  {
    icon: ['fab', 'bitcoin'],
    title: `${t('About.Donate')} - BTC`,
    content: `<a href="bitcoin:${ABOUT_BITCOIN_ADDRESS}">${ABOUT_BITCOIN_ADDRESS}</a>`
  }
])
</script>

<style scoped src="./About.css" />
