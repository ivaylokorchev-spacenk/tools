export const styles = `<style translate="no">
.search-slot-bottom {
  padding: 24px 0;
}
.search-slot-bottom > div:first-child {
  margin-bottom: 32px;
}
.search-slot-bottom .btn .icon-snk-plus {
  display: none;
}
.search-slot-bottom .btn .icon-snk-minus {
  display: block;
}
.search-slot-bottom .btn.collapsed .icon-snk-plus {
  display: block;
}
.search-slot-bottom .btn.collapsed .icon-snk-minus {
  display: none;
}
.search-slot-bottom img {
  width: 74px;
  height: 74px;
  object-fit: cover;
  flex-shrink: 0;
}
.search-slot-bottom .border-bottom {
  border-color: #d3c5bc !important;
}
.search-slot-bottom .icon-snk-arrow-right::before {
  font-weight: 1000 !important;
  display: flex;
}
@media (min-width: 810px) {
  .search-slot-bottom {
    padding: 40px 0;
  }
  .search-slot-bottom img {
    width: 110px;
    height: 110px;
  }
  .search-slot-bottom > div:first-child {
    margin-bottom: 40px;
  }
}
</style>`;