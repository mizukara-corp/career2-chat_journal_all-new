// 年齢回答を保持
let selectedAge = '';

// 新規追加：アクセス時のクエリパラメータをリンクのURLへ反映する処理
window.addEventListener('DOMContentLoaded', () => {
    const queryString = window.location.search;
    if (queryString) {
      const lineLink = document.querySelector('a[data-cats="lineFriendsFollowLink"]');
      if (lineLink) {
        let href = lineLink.getAttribute('href');
        if (href.indexOf('?') > -1) {
          href += '&' + queryString.substring(1);
        } else {
          href += queryString;
        }
        lineLink.setAttribute('href', href);
      }
    }
  });

window.addEventListener('scroll', () => {
  let scrollHeight = window.scrollY;
  let windowHeight = window.innerHeight;
})

const InnerText = (id, value) => {
  return new Promise(resolve => {
    if (value) {
      const chatWindow = document.getElementById(id);
      const text = chatWindow.querySelector('.chat__text');
      text.innerHTML = value;
    }
    resolve();
  });
}

const ChatPop = async (id, resolve, time = 800, value = '') => {
  await InnerText(id, value);
  return new Promise(async (resolve) => {

    const Pop = () => {
      return new Promise(resolve => {
        const chatWindow = document.getElementById(id);
        chatWindow.style.display = 'flex';
        const height = chatWindow.scrollHeight;
        setTimeout(() => {
          chatWindow.style.height = `${height}px`;
          chatWindow.style.opacity = 1;
          chatWindow.style.transform = "translateY(0px)";
          setTimeout(() => {
            chatWindow.classList.add('chat__box--pop');
            chatWindow.style.height = 'auto';
          }, 400);
          resolve(chatWindow);
        }, time);
      })
    }

    let res = await Pop();
    Scroll(res);
    resolve(res);
  })
}

const Scroll = (elm, position = 'bottom', id) => {
  return new Promise(resolve => {
    setTimeout(() => {
      if (id == 3) {
        elm = document.getElementById('admin-7');
      }
      let scrollHeight = window.scrollY;
      let windowHeight = window.innerHeight;
      let elmRect = elm.getBoundingClientRect();
      let bottom = elmRect.bottom;
      let top = elmRect.top;
      let scroll = scrollHeight - windowHeight + bottom;
      const padding = 40;
      if (scroll > 0) {
        if (position == 'top') {
          const headerHeight = document.getElementsByClassName("header")[0].clientHeight;
          window.scrollTo({
            top: scrollHeight + top - padding - headerHeight,
            left: 0,
          })
        } else if (position == 'remove') {
          scroll = scrollHeight - windowHeight + top;
          window.scrollTo({
            top: scroll + padding,
            left: 0
          })
        } else {
          window.scrollTo({
            top: scroll + padding,
            left: 0,
          });
        }
      }
      return resolve();
    }, 400);
  })
}

const ChatTextView = (box, resolve) => {
  let viewTime = 1000;
  if (box.id == 'admin-7') {
    viewTime = 3000;
  }
  let numId = Number(box.id.replace('admin-', ''));

  return new Promise(resolve => {
    setTimeout(() => {
      const text = box.querySelector('.chat__text');
      const dots = box.querySelector('.spinner-box');
      const width = text.scrollWidth;

      dots.classList.add('spinner-box--close');
      text.style.width = `${width}px`;
      text.style.opacity = 1;

      setTimeout(() => {
        text.style.width = 'fit-content';
        text.classList.add('chat__text--view')
      }, 800);
      resolve();
    }, viewTime);
  });
}

const AnAnswerView = async (answer) => {
  const chatAnswer = document.getElementById('chatAnswer');
  const AnBoxView = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        answer.remove();
        resolve();
      }, 0)
    })
  }
  await AnBoxView();
}

document.addEventListener('click', async (e) => {
  const target = e.target.closest('.chat__answer__item');
  const answer = e.target.closest('.chat__answer__list');

  if (target) {
    const value = target.dataset.value;
    const nextId = Number(answer.id.replace('answer-', '')) + 1;
    const id = answer.id.replace('answer-', 'user-');
    const adminId = answer.dataset.return;
    const inputId = answer.id.replace('answer-', 'input-answer-');
    const input = document.getElementById(inputId);
    input.value = value;

    // ★ 第一問（answer-0）の回答を保存
    if (answer.id === 'answer-0') {
      selectedAge = value;
    }

    answer.style.height = '0px';
    answer.style.opacity = 0;
    await AnAnswerView(answer);
    await ChatPop(id, '', 0, value);
    await StartUpPop(adminId, 0);

    if (value === '給料') {
      await ChatPop(adminId, '', 0, '回答ありがとうございます！<br><br>「給料」を上げるためには、<span class="text--red text--bold">失敗を恐れず、自分の人生を突き抜けることが非常に重要です！！</span><br><br><span class="text--red text--bold text--under">公式LINEを登録</span>して、7つの質問ワークシートを<span class="text--red text--bold text--under">無料</span>で受け取ってください！<br><br>あなただけの突き抜ける方法を見つけ、熱狂できる人生の第一歩を踏み出しましょう。');
    } else if (value === '仕事のやりがい') {
      await ChatPop(adminId, '', 0, '回答ありがとうございます！<br><br>「仕事のやりがい」を充実させるためには、<span class="text--red text--bold">自分の中での熱狂を理解し、公私ともに突き抜けることが重要です！！</span><br><br><span class="text--red text--bold text--under">公式LINEを登録</span>して、7つの質問ワークシートを<span class="text--red text--bold text--under">無料</span>で受け取ってください！<br><br>あなただけの突き抜ける方法を見つけ、熱狂できる人生の第一歩を踏み出しましょう。');
    } else if (value === '人間関係・勤務場所') {
      await ChatPop(adminId, '', 0, '回答ありがとうございます！<br><br>人間関係を良くして働くためには、<span class="text--red text--bold">「自分が何をしたいのか」を明確にする必要があります！！</span><br><br><span class="text--red text--bold text--under">公式LINEを登録</span>して、7つの質問ワークシートを<span class="text--red text--bold text--under">無料</span>で受け取ってください！<br><br>あなただけの突き抜ける方法を見つけ、熱狂できる人生の第一歩を踏み出しましょう。');
    } else if (value === 'キャリアアップ') {
      await ChatPop(adminId, '', 0, '回答ありがとうございます！<br><br>自分の理想のキャリアを作るためには、<span class="text--red text--bold">自分の強みを理解して、その強みを活かせる業務内容に取り組むのが重要です！</span><br><br><span class="text--red text--bold text--under">公式LINEを登録</span>して、7つの質問ワークシートを<span class="text--red text--bold text--under">無料</span>で受け取ってください！<br><br>あなただけの突き抜ける方法を見つけ、熱狂できる人生の第一歩を踏み出しましょう。');
    }
    AnswerView(nextId);
  }
})

const AnswerView = async (id) => {
  let time = 400;
  let position = 'bottom';
  if (id == 3) {
    time = 3000;
    position = 'top';

    // ★ 年齢に応じてCTAリンクを差し替え
    const ageRedirectMap = {
      '24歳以下': '/career2/chat_journal_all-new/redirect/01.html',
      '25-35歳':  '/career2/chat_journal_all-new/redirect/02.html',
      '36-45歳':  '/career2/chat_journal_all-new/redirect/03.html',
      '46歳以上': '/career2/chat_journal_all-new/redirect/04.html',
    };
    const ctaLink = document.querySelector('a[data-cats="lineFriendsFollowLink"]');
    if (ctaLink && ageRedirectMap[selectedAge]) {
      // ★ 現在のページのパラメータをリンク先に付与
      const queryString = window.location.search;
      const baseUrl = ageRedirectMap[selectedAge];
      const finalUrl = queryString ? baseUrl + queryString : baseUrl;
      ctaLink.setAttribute('href', finalUrl);
      ctaLink.setAttribute('target', '_blank');
    }
  }

  const chatAnswer = document.getElementById('chatAnswer');
  const boxView = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        const answerList = document.getElementById(`answer-${id}`);
        const listHeight = answerList.scrollHeight;
        answerList.style.opacity = 1;
        answerList.style.height = `${listHeight}px`;
        chatAnswer.style.height = `${listHeight}px`;
        chatAnswer.style.opacity = 1
        resolve();
      }, time);
    })
  }
  await boxView();
  Scroll(chatAnswer, position, id);
  chatAnswer.classList.add('chat__answer--open');
}

const StartUpPop = async (id, time = 800) => {
  let box = await ChatPop(id);
  ChatTextView(box);
  return new Promise(resolve => {
    setTimeout(() => {
      return resolve();
    }, time);
  })
}

const StartUp = async () => {
  let promise = new Promise((resolve, reject) => {
    const chatWindow = document.getElementById('chatWindow');
    setTimeout(() => {
      chatWindow.classList.add('chat--open');
      resolve();
    }, 500);
  })

  await StartUpPop('admin-0')
  await StartUpPop('admin-1');
  await StartUpPop('admin-2');
  await StartUpPop('admin-3');
  await StartUpPop('admin-4');

  setTimeout(() => {
    AnswerView(0);
  }, 0);
}
StartUp();


// Form Script
document.addEventListener('input', (e) => {
  const input = e.target.closest('.input__text');
  if (input) {
    InputCheck(input);
  }
});

const InputCheck = (input) => {
  const value = input.value;
  const name = input.name;
  const errorBox = document.getElementById('error-' + name);
  if (!value) {
    errorBox.innerHTML = '必須の入力項目です';
    return 'error';
  } else {
    errorBox.innerHTML = '';
  }
}

const selectCheck = (select) => {
  const value = select.value;
  const name = select.name;
  const errorBox = document.getElementById('error-' + name);
  if (!value) {
    errorBox.innerHTML = '必須の入力項目です';
    return 'error';
  } else {
    errorBox.innerHTML = '';
  }
}

document.addEventListener('click', (e) => {
  const submit = e.target.closest('.form__submit');
  const form = document.forms.form;
  if (submit) {
    e.preventDefault();
    const inputs = document.getElementsByClassName('input__text');
    let error = [];
    for (let i = 0; i < inputs.length; i++) {
      let errorMessage = InputCheck(inputs[i]);
      if (errorMessage) {
        error.push(errorMessage);
      }
    }
    if (error.length == 0) {
      if (!validatePhoneNumber()) {
        event.preventDefault();
      } else {
        form.submit();
      }
    } else {
      return false;
    }
  }
})