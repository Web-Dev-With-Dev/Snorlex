<template>
  <div class="skeletonGrid" :style="{ '--skeleton-cols': count || 6 }">
    <div
      v-for="n in (count || 6)"
      :key="n"
      class="skeletonCard"
    >
      <div class="skeletonThumb shimmer" />
      <div class="skeletonInfo">
        <div class="skeletonAvatar shimmer" />
        <div class="skeletonTextGroup">
          <div class="skeletonLine line1 shimmer" />
          <div class="skeletonLine line2 shimmer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  count: {
    type: Number,
    default: 6
  }
})
</script>

<style scoped>
.skeletonGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  width: 100%;
  padding-block: 8px;
}

.skeletonCard {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: var(--card-bg-color, #18181b);
  border-radius: 12px;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.skeletonThumb {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
}

.skeletonInfo {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.skeletonAvatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  flex-shrink: 0;
}

.skeletonTextGroup {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.skeletonLine {
  height: 12px;
  border-radius: 4px;
}

.line1 {
  width: 90%;
}

.line2 {
  width: 60%;
}

.shimmer {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.04) 0%,
    rgba(255, 255, 255, 0.09) 50%,
    rgba(255, 255, 255, 0.04) 100%
  );
  background-size: 200% 100%;
  animation: shimmerAnim 1.6s infinite ease-in-out;
}

@keyframes shimmerAnim {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
