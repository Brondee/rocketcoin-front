import React from "react";
import SideBar from "../shared/SideBar";
import Layout from "../layout/Layout";

import walletLine from "../../assets/img-all-lk/wallet-3-line-2.svg";

const Withdraw = () => {
  return (
    <main>
      <Layout title="Rocketcoin - Вывод">
        <section className="content-lk">
          <a href="#!" className="btn-open-modal-panel-lk">
            Меню кабинета
          </a>
          <SideBar />
          <div class="right-content-lk">
            <h1 class="title-page-lk">Вывод</h1>
            <div class="wrapper-page-lk">
              <div class="content-block-flex-lk-white">
                <div class="block-info-your-balance">
                  <img src={walletLine} alt="" />
                  <div class="text-block-info-your-balance">
                    <p>На вашем аккаунте:</p>
                    <h2>120 токенов</h2>
                  </div>
                </div>
                <div class="flex-info-your-wallet">
                  <div class="block-info-your-wallet">
                    <p>Ваш кошелёк</p>
                    <input
                      type="text"
                      value="https://viefaucet.com?r=6437123173797873b4f86f60"
                      required
                    />
                  </div>
                  <div class="block-info-your-wallet">
                    <p>Количество токеннов на вывод</p>
                    <input type="number" value="239" required />
                  </div>
                </div>
                <div class="flex-blocks-wallet-you-can">
                  <div class="flex-blocks-wallet-you-can-block">
                    <img src="img-all-lk/b1.png" alt="" />
                    <div class="text-flex-blocks-wallet-you-can">
                      <p>BTC - FaucetPay</p>
                      <h3>~0.0000004 BTC</h3>
                    </div>
                  </div>
                  <div class="flex-blocks-wallet-you-can-block">
                    <img src="img-all-lk/b2.png" alt="" />
                    <div class="text-flex-blocks-wallet-you-can">
                      <p>Ethereum</p>
                      <h3>~0.00004 ETH</h3>
                    </div>
                  </div>
                  <div class="flex-blocks-wallet-you-can-block">
                    <img src="img-all-lk/b3.png" alt="" />
                    <div class="text-flex-blocks-wallet-you-can">
                      <p>Tether</p>
                      <h3>~0.0004 USDT</h3>
                    </div>
                  </div>
                  <div class="flex-blocks-wallet-you-can-block">
                    <img src="tron.png" alt="" />
                    <div class="text-flex-blocks-wallet-you-can">
                      <p>Tron (TRX)</p>
                      <h3>~0.00485549 TRX</h3>
                    </div>
                  </div>
                  <div class="flex-blocks-wallet-you-can-block">
                    <img src="dog.png" alt="" />
                    <div class="text-flex-blocks-wallet-you-can">
                      <p>Dogecoin (DOGE)</p>
                      <h3>~0.0000000 DOGE</h3>
                    </div>
                  </div>
                  <div class="flex-blocks-wallet-you-can-block">
                    <img src="img-all-lk/b5.png" alt="" />
                    <div class="text-flex-blocks-wallet-you-can">
                      <p>BNB</p>
                      <h3>~0.00059 BNB</h3>
                    </div>
                  </div>
                  <div class="flex-blocks-wallet-you-can-block">
                    <img src="img-all-lk/b6.png" alt="" />
                    <div class="text-flex-blocks-wallet-you-can">
                      <p>Solana</p>
                      <h3>~0.00059 SOL</h3>
                    </div>
                  </div>
                  <div class="flex-blocks-wallet-you-can-block">
                    <img src="Litecoin.png" alt="" />
                    <div class="text-flex-blocks-wallet-you-can">
                      <p>Litecoin (LTC)</p>
                      <h3>~0.00000116 LTC</h3>
                    </div>
                  </div>

                  <div class="flex-blocks-wallet-you-can-block">
                    <img src="Polygon MATIC.png" alt="" />
                    <div class="text-flex-blocks-wallet-you-can">
                      <p>Polygon (MATIC)</p>
                      <h3>~0.00000000 MATIC</h3>
                    </div>
                  </div>
                </div>
                <div class="btn-content-output">
                  <a href="#!" class="btn-output">
                    Вывести на кошелёк
                  </a>
                  <p>
                    При выводе менее 5000 токенов комиссия составит 5% при
                    выводе более 5000 токенов бонус составит 5%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </main>
  );
};

export default Withdraw;
