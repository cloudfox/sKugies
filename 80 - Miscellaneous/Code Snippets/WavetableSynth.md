


```cpp
//WavetableSynth.cpp
//
//Steven Kugies
//Assignment #9
//CS245
//Spring 2023


#include "WavetableSynth.h"
#include <iostream>


WavetableSynth::WavetableSynth(int devno, int R) : MidiIn(devno), rate(1.0f / R), audioData_("WavetableSynth.wav")
{
  for(int i = 0; i < 10; ++i)
    resampler_[i] = new Resample(&audioData_, 0, 1, 27862, 30201);

  MidiIn::start();
}

WavetableSynth::~WavetableSynth(void)
{
  MidiIn::stop();
  for (int i = 0; i < 10; ++i)
    delete resampler_[i];
}

float WavetableSynth::getValue(void)
{
  float value = 0;
  const float vibratoPitchShift = vibratoDepth_ * sin(lfo_argument);
  const float netPitchShift = pitchWheelShift_ + vibratoPitchShift;

  for(unsigned int i = 0; i < notes.size(); ++i)
  {
    resampler_[i]->setPitchOffset(notes[i].pitch + netPitchShift);
    const float noteValue = (440.0f/114.0f) * resampler_[i]->getValue() * notes[i].adsr.getValue();
    value += notes[i].gainFactor * noteValue;
  }

  return  value * globalVolume_;
}

void WavetableSynth::incrementTime(void)
{
  for (Note& n : notes)
  {
    n.time += rate;
    n.adsr.incrementTime();  
  }

  for(int i = 0; i < notes.size(); ++i)
    resampler_[i]->incrementTime();

  lfo_argument += lfo_dargument;
}

void WavetableSynth::onNoteOn(int channel, int note, int velocity)
{

  //check if note is vector already
  for(unsigned int i = 0; i < notes.size(); ++i)
  {
    if(notes[i].index == note)
    {
      notes[i].adsr.reset();
      resampler_[i]->reset();
      std::rotate(notes.begin() + i, notes.begin() + i+1, notes.end());
      for(int j = i; j < 9; ++j)
      {
      std::swap(resampler_[j], resampler_[j + 1]);
      }

      return;
    }
  }

  //check if vector is full
  if(notes.size() > 9)
    notes.erase(notes.begin());

  //add note to vector
  Note n{};
  n.index = note;
  n.gainFactor = velocity / 127.0f;
  n.pitch = (note - 69.0f) * 100.0f;
  n.time = 0;
  notes.push_back(n);
  resampler_[notes.size()-1]->reset();
}

void WavetableSynth::onNoteOff(int channel, int note)
{
  int index = 0;
  for (unsigned int i = 0; i < notes.size(); i++)
  {
    if (notes[i].index == note)
    {
      index = i;
      notes[i].adsr.sustainOff();
      break;
    }
  }

  for(int i = index; i > 0 ; --i)
  {
    if (notes[i-1].adsr.getMode() == ADSR::RELEASE)
      break;

    std::swap(notes[i], notes[i - 1]);
    std::swap(resampler_[i], resampler_[i - 1]);
  }
}

void WavetableSynth::onPitchWheelChange(int channel, float value)
{
  pitchWheelShift_ = value * 200.0f;
}

void WavetableSynth::onModulationWheelChange(int channel, int value)
{
  vibratoDepth_ = (value / 127.0f) * 200.0f;
}

void WavetableSynth::onVolumeChange(int channel, int level)
{
  globalVolume_ = level / 127.0f;
}
```