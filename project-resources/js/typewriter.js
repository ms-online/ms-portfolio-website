class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement
    this.words = words
    this.txt = ''
    this.wordIndex = 0
    this.wait = parseInt(wait, 10)
    this.type()
    this.isDeleting = false
  }

  type() {
    //获取当前文字索引下标
    const current = this.wordIndex % this.words.length
    //通过检索得到完整文本
    const fullTxt = this.words[current]

    //验证是否删除
    if (this.isDeleting) {
      // 移除文字
      this.txt = fullTxt.substring(0, this.txt.length - 1)
    } else {
      // 添加文字
      this.txt = fullTxt.substring(0, this.txt.length + 1)
    }

    // 将文本插入到元素
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`

    // 初始化打字机速度
    let typeSpeed = 300

    if (this.isDeleting) {
      typeSpeed /= 2
    }

    // 验证文本是否完整出现
    if (!this.isDeleting && this.txt === fullTxt) {
      // 在末尾处进行暂时停顿
      typeSpeed = this.wait
      // 设置delete为true
      this.isDeleting = true
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false
      // 移动文字的索引
      this.wordIndex++
      // 打印前进行暂时停顿
      typeSpeed = 500
    }

    setTimeout(() => this.type(), typeSpeed)
  }
}

// 初始化DOM加载
document.addEventListener('DOMContentLoaded', init)

// 初始化app
function init() {
  const txtElement = document.querySelector('.txt-type')
  const words = JSON.parse(txtElement.getAttribute('data-words'))
  const wait = txtElement.getAttribute('data-wait')
  // 初始化打字机
  new TypeWriter(txtElement, words, wait)
}
