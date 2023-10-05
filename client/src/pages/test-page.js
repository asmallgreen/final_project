import React, { useState } from "react";

export default function TestPage() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div class="container">
      <div class="tabular-data module">
        <div class="data-group data-header hidden-sm hidden-xs">
          <div class="row">
            <div class="col-lg-1 col-md-1">
              <strong class="uppercase">Item #</strong>
            </div>
            <div class="col-lg-8 col-md-7">
              <strong class="uppercase">Description</strong>
            </div>
            <div class="col-lg-3 col-md-4">
              <strong class="uppercase">Status</strong>
            </div>
          </div>
        </div>
        <div class="data-group">
          <div class="row">
            <div class="data-expands">
              <div class="col-lg-1 col-md-1" >1245346</div>
              <div class="col-lg-8 col-md-7">
                <span class="title">
                  Cromulent waste removal may behoove us.
                </span>
              </div>
              <div class="col-lg-3 col-md-4">
                <div class="red uppercase">
                  <strong>
                    <i class="fa fa-exclamation-circle"></i> Awaiting Approval
                  </strong>
                  <span class="row-toggle">
                    <span class="horizontal"></span>
                    <span class="vertical"></span>
                  </span>
                </div>
              </div>
            </div>
            <div class="expandable">
              <div class="row">
                <div class="col-lg-8 col-lg-offset-1 col-md-7 col-md-offset-1">
                  <p>
                    Just once I'd like to eat dinner with a celebrity who isn't
                    bound and gagged. But, like most politicians, he promised
                    more than he could deliver. If rubbin' frozen dirt in your
                    crotch is wrong, hey I don't wanna be right.
                  </p>
                  <p>
                    Tell her you just want to talk. It has nothing to do with
                    mating. Well I'da done better, but it's plum hard pleading a
                    case while awaiting trial for that there incompetence. Is
                    that a cooking show? Bender! Ship! Stop bickering or I'm
                    going to come back there and change your opinions manually!
                  </p>
                </div>
                <div class="col-lg-3 col-md-4">
                  <div class="row">
                    <div class="col-xs-12 visible-sm visible-xs">
                      <hr />
                    </div>
                    <div class="col-xs-6">Technician Labor</div>
                    <div class="col-xs-6 text-right">2,400.00</div>
                    <div class="col-xs-6">Parts</div>
                    <div class="col-xs-6 text-right">4,500.00</div>
                    <div class="col-xs-6">Inspection</div>
                    <div class="col-xs-6 text-right">400.00</div>
                    <div class="col-xs-12">
                      <hr />
                    </div>
                    <div class="col-xs-6">Total</div>
                    <div class="col-xs-6 text-right">$7,300.00</div>
                    <div class="col-xs-12">
                      <hr />
                    </div>
                    <div class="col-xs-6">
                      <a href="#" class="btn btn-black">
                        <i class="fa fa-phone"></i> Contact
                      </a>
                    </div>
                    <div class="col-xs-6 text-right">
                      <a href="#" class="btn btn-green">
                        <i class="fa fa-check-circle-o"></i> Approve
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="data-group">
          <div class="row">
            <div class="data-expands">
              <div class="col-lg-1 col-md-1">7245623</div>
              <div class="col-lg-8 col-md-7">
                <span class="title">
                  Having a bibble with a minimum of three friends.
                </span>
              </div>
              <div class="col-lg-3 col-md-4">
                <div class="green uppercase">
                  <strong>
                    <i class="fa fa-check-circle"></i> Approved
                  </strong>
                  <span class="row-toggle">
                    <span class="horizontal"></span>
                    <span class="vertical"></span>
                  </span>
                </div>
              </div>
            </div>
            <div class="expandable">
              <div class="row">
                <div class="col-lg-8 col-lg-offset-1 col-md-7 col-md-offset-1">
                  <p>
                    I'm the Doctor, I'm worse than everyone's aunt. *catches
                    himself* And that is not how I'm introducing myself. You
                    hate me; you want to kill me! Well, go on! Kill me! KILL ME!
                    Father Christmas. Santa Claus. Or as I've always known him:
                    Jeff.
                  </p>

                  <p>
                    I hate yogurt. It's just stuff with bits in. You hit me with
                    a cricket bat. All I've got to do is pass as an ordinary
                    human being. Simple. What could possibly go wrong? The way I
                    see it, every life is a pile of good things and bad
                    things.…hey.…the good things don't always soften the bad
                    things; but vice-versa the bad things don't necessarily
                    spoil the good things and make them unimportant.
                  </p>
                </div>
                <div class="col-lg-3 col-md-4">
                  <div class="row">
                    <div class="col-xs-12 visible-sm visible-xs">
                      <hr />
                    </div>
                    <div class="col-xs-6">Left Bracket</div>
                    <div class="col-xs-6 text-right">20.00</div>
                    <div class="col-xs-6">Right Bracket</div>
                    <div class="col-xs-6 text-right">20.00</div>
                    <div class="col-xs-6">Tax</div>
                    <div class="col-xs-6 text-right">1.50</div>
                    <div class="col-xs-12">
                      <hr />
                    </div>
                    <div class="col-xs-6">Total</div>
                    <div class="col-xs-6 text-right">$41.50</div>
                    <div class="col-xs-12">
                      <hr />
                    </div>
                    <div class="col-xs-6">
                      <a href="#" class="btn btn-black">
                        <i class="fa fa-phone"></i> Contact
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="data-group">
          <div class="row">
            <div class="data-expands">
              <div class="col-lg-1 col-md-1">9356257</div>
              <div class="col-lg-8 col-md-7">
                <span class="title">
                  A delightful tune from the doodle sack.
                </span>
              </div>
              <div class="col-lg-3 col-md-4">
                <div class="uppercase">
                  <strong>
                    <i class="fa fa-wrench"></i> In Progress
                  </strong>
                  <span class="row-toggle">
                    <span class="horizontal"></span>
                    <span class="vertical"></span>
                  </span>
                </div>
              </div>
            </div>
            <div class="expandable">
              <div class="row">
                <div class="col-lg-8 col-lg-offset-1 col-md-7 col-md-offset-1">
                  <p>
                    Well, what do you expect, mother? But I bought a yearbook ad
                    from you, doesn't that mean anything anymore? Across from
                    where? It's called 'taking advantage.' It's what gets you
                    ahead in life.
                  </p>
                  <p>
                    Not tricks, Michael, illusions. Get me a vodka rocks. And a
                    piece of toast. Whoa, this guy's straight? Bad news. Andy
                    Griffith turned us down. He didn't like his trailer.
                    Michael!
                  </p>
                </div>
                <div class="col-lg-3 col-md-4">
                  <div class="row">
                    <div class="col-xs-12 visible-sm visible-xs">
                      <hr />
                    </div>
                    <div class="col-xs-6">Cleaning</div>
                    <div class="col-xs-6 text-right">40.00</div>
                    <div class="col-xs-6">Polish</div>
                    <div class="col-xs-6 text-right">20.00</div>
                    <div class="col-xs-12">
                      <hr />
                    </div>
                    <div class="col-xs-6">Total</div>
                    <div class="col-xs-6 text-right">$60.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="data-group">
          <div class="row">
            <div class="data-expands">
              <div class="col-lg-1 col-md-1">8684257</div>
              <div class="col-lg-8 col-md-7">
                <span class="title">
                  Fill the printer, one quire should do.
                </span>
              </div>
              <div class="col-lg-3 col-md-4">
                <div class="uppercase">
                  <strong>
                    <i class="fa fa-wrench"></i> In Progress
                  </strong>
                  <span class="row-toggle">
                    <span class="horizontal"></span>
                    <span class="vertical"></span>
                  </span>
                </div>
              </div>
            </div>
            <div class="expandable">
              <div class="row">
                <div class="col-lg-8 col-lg-offset-1 col-md-7 col-md-offset-1">
                  <p>
                    Goodbye, cruel world. Goodbye, cruel lamp. Goodbye, cruel
                    velvet drapes, lined with what would appear to be some sort
                    of cruel muslin and the cute little pom-pom curtain pull
                    cords. Cruel though they may be…
                  </p>

                  <p>
                    Quit destroying the universe! She also liked to shut up! You
                    wouldn't. Ask anyway! Wow! A superpowers drug you can just
                    rub onto your skin? You'd think it would be something you'd
                    have to freebase.
                  </p>
                </div>
                <div class="col-lg-3 col-md-4">
                  <div class="row">
                    <div class="col-xs-12 visible-sm visible-xs">
                      <hr />
                    </div>
                    <div class="col-xs-6">Annual Review</div>
                    <div class="col-xs-6 text-right">8.00</div>
                    <div class="col-xs-6">Certification</div>
                    <div class="col-xs-6 text-right">15.00</div>
                    <div class="col-xs-12">
                      <hr />
                    </div>
                    <div class="col-xs-6">Total</div>
                    <div class="col-xs-6 text-right">$23,00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="data-group">
          <div class="row">
            <div class="data-inactive">
              <div class="col-lg-1 col-sm-1">2858365</div>
              <div class="col-lg-8 col-sm-7 col-xs-6">
                <span>A particularly argute mammal.</span>
              </div>
              <div class="col-lg-3 col-sm-4 col-xs-6 text-right">
                <div class="uppercase">
                  <strong>
                    <i class="fa fa-check-circle"></i> Complete
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="data-group">
          <div class="row">
            <div class="data-inactive">
              <div class="col-lg-1 col-sm-1">6327457</div>
              <div class="col-lg-8 col-sm-7 col-xs-6">
                <span>The politics are nothing but velleity.</span>
              </div>
              <div class="col-lg-3 col-sm-4 col-xs-6 text-right">
                <div class="uppercase">
                  <strong>
                    <i class="fa fa-check-circle"></i> Complete
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
